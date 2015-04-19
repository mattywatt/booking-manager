from ritsuko import app, db
from models import Person, Booking, Plane
from flask import render_template, request, session, redirect, url_for

import json
import datetime

@app.route('/')
def index():
	if session.get('person_id') is not None:
		loggedIn = True
	else:
		loggedIn = False
	print loggedIn
	return render_template('index.html', loggedIn=loggedIn)

@app.route('/logout')
def logout():
    session.pop('person_id', None)
    return redirect(url_for('index'))


@app.route('/bookings', methods=['POST'])
def booking():
	postDict = request.get_json()
	if session['person_id']:
		booking = Booking(postDict['startDate'],
						  postDict['endDate'],
						  postDict['planeId'],
						  postDict['instructorId'],
						  session['person_id'])
		db.session.add(booking)
		db.session.commit()

	return str(booking.id)

@app.route("/bookings", methods=['GET'])
def bookings():
	bookings = Booking.query.all()
	planes = Plane.query.all()

	dictList = []
	for p in planes:
		plane = p.as_dict()
		bookings = []
		for b in p.bookings:
			bookings.append(b.as_dict());
		plane['bookings'] = bookings
		dictList.append(plane)
	dthandler = lambda obj: (
					obj.isoformat()
					if isinstance(obj, datetime.datetime)
					or isinstance(obj, datetime.date)
					else None)
	return json.dumps(dictList, default=dthandler)

@app.route("/bookings/<date>", methods=['GET'])
def bookings_date(date):
	start = date + 'T00:00'
	end = date + 'T23:59'

	print start
	print end

	planes = Plane.query.filter(Booking.start_date.between(start, end))

	#planes = db.session.query(Plane).join(Booking).filter(Booking.start_date >= start, Booking.end_date <= end).all() 

	#planes = db.engine.execute('''SELECT b.start_date, b.end_date
	#							  FROM plane p, booking b
	#							  WHERE b.plane_id = p.id
	#							  AND b.start_date > start''')

	dictList = []
	for p in planes:
		plane = p.as_dict()
		bookings = []
		for b in p.bookings:
			bookings.append(b.as_dict());
		plane['bookings'] = bookings
		dictList.append(plane)
	dthandler = lambda obj: (
					obj.isoformat()
					if isinstance(obj, datetime.datetime)
					or isinstance(obj, datetime.date)
					else None)

	print '+++++++'

	return json.dumps(dictList, default=dthandler)

@app.route('/instructors', methods=['GET'])
def instructors():
	instructors = Person.query.filter(Person.type == 'instructor')
	dictList = []
	for instructor in instructors:
		dictList.append(instructor.as_dict())
	return json.dumps(dictList)

@app.route("/users", methods=['POST'])
def user_create():
	postDict = request.get_json()
	person = Person(postDict['username'], postDict['password'], postDict['type'])
	db.session.add(person)
	db.session.commit()
	session['person_id'] = person.id
	print session['person_id']
	return json.dumps('{ "foo": "bar" }')

@app.route("/login", methods=['POST'])
def login():
	postDict = request.get_json()
	person = Person.query.filter(Person.username == postDict['username'], Person.password == postDict['password']).first()
	if person:
		session['person_id'] = person.id
		return json.dumps(person.as_dict())
	return '0'
	

@app.route("/planes", methods=['GET'])
def planes():
	planes = Plane.query.all()
	dictList = []
	for p in planes:
		dictList.append(p.as_dict())
	return json.dumps(dictList)

@app.route("/planes", methods=['POST'])
def plane_create():
	postDict = request.get_json()
	if session['person_id']:
		plane = Plane(postDict['name'], postDict['description'])
		db.session.add(plane)
		db.session.commit()

