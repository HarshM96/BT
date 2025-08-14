from sqlalchemy import Column, Integer, String, Float
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password = Column(String(255))  # Store hashed passwords

class Budget(Base):
    __tablename__ = "budgets"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50))
    month = Column(String(20))
    income = Column(Float)
    expenses = Column(Float)
