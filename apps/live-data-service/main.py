from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime

app = FastAPI(title="AI-ERP Live Feed Service")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Live Data Service Operational", "timestamp": str(datetime.now())}

@app.get("/feeds/bike-lease")
def get_bike_lease_data():
    """Returns mock live bike lease data."""
    return [
        {
            "id": "BL-501",
            "model": "EV-Quantum X",
            "provider": "GreenLease Corp",
            "rate": "$45/day",
            "availability": "High",
            "units": 150,
            "trend": "+12% demand",
            "location": "Chennai Warehouse"
        },
        {
            "id": "BL-502",
            "model": "Volt-Shift Series 4",
            "provider": "UrbanMotion",
            "rate": "$38/day",
            "availability": "Limited",
            "units": 24,
            "trend": "Surge in Pune",
            "location": "Mumbai Hub"
        },
        {
            "id": "BL-503",
            "model": "Carbon-Lite Pro",
            "provider": "SkyLease",
            "rate": "$52/day",
            "availability": "Out of Stock",
            "units": 0,
            "trend": "Restocking in 2 days",
            "location": "Bangalore Depot"
        }
    ]

@app.get("/feeds/corporate-requirements")
def get_corp_requirements():
    """Returns mock top company live requirements."""
    return [
        {
            "company": "Amazon IN",
            "requirement": "Last-mile Delivery Fleet (500 EVs)",
            "priority": "Critical",
            "budget": "$1.2M",
            "timeline": "April 2026",
            "status": "RFP Open"
        },
        {
            "company": "Reliance Retail",
            "requirement": "Warehouse Automation Systems",
            "priority": "High",
            "budget": "$4.5M",
            "timeline": "Q3 2026",
            "status": "Shortlisting"
        },
        {
            "company": "Tata Motors",
            "requirement": "Lithium Cell Supply Chain",
            "priority": "Strategic",
            "budget": "$12M",
            "timeline": "Ongoing",
            "status": "Partner Evaluation"
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)
