from fastapi import FastAPI

app = FastAPI(title="SOLARCOOL NER API")


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "SOLARCOOL NER backend is running"
    }