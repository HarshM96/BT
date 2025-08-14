from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import Base, engine, SessionLocal
from models import User, Budget
import bcrypt
import os

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS for frontend at localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Request models
class AuthRequest(BaseModel):
    username: str
    password: str

class BudgetRequest(BaseModel):
    username: str
    month: str
    income: float
    expenses: float


@app.post("/signup")
def register(request: AuthRequest, db: Session = Depends(get_db)):
    # Check if username already exists
    if db.query(User).filter(User.username == request.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")

    # Hash password
    hashed_pw = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(username=request.username, password=hashed_pw.decode('utf-8'))
    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}


@app.post("/login")
def login(request: AuthRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()

    # Check password
    if not user or not bcrypt.checkpw(request.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}


@app.post("/add_budget")
def add_budget(request: BudgetRequest, db: Session = Depends(get_db)):
    new_budget = Budget(username=request.username, month=request.month,
                        income=request.income, expenses=request.expenses)
    db.add(new_budget)
    db.commit()

    # Save also to a text file
    folder = "monthly_data"
    os.makedirs(folder, exist_ok=True)
    with open(f"{folder}/{request.month}.txt", "a") as f:
        f.write(f"User: {request.username}, Income: {request.income}, Expenses: {request.expenses}\n")

    return {"message": f"Budget for {request.month} saved"}
