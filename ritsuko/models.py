from ritsuko import db


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(120))
    type = db.Column(db.String(80))

    def __init__(self, username, password, type):
        self.username = username
        self.password = password
        self.type = type

    def __repr__(self):
        return '<Person %r>' % self.username

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    person = db.relationship('Person', foreign_keys=[person_id], backref=db.backref('bookings', lazy='dynamic'))
    
    instructor_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    instructor = db.relationship('Person', foreign_keys=[instructor_id], backref=db.backref('instructor_bookings', lazy='dynamic'))

    plane_id = db.Column(db.Integer, db.ForeignKey('plane.id'))
    plane = db.relationship('Plane', backref=db.backref('bookings', lazy='dynamic'))

    def __init__(self, start_date, end_date, plane_id, instructor_id, person_id):
        self.start_date = start_date
        self.end_date = end_date
        self.plane_id = plane_id
        self.instructor_id = instructor_id
        self.person_id = person_id

    def __repr__(self):
        return '<Booking... %r>'

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Plane(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    description = db.Column(db.String(120))
    
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Plane... %r>'

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}