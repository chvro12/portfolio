from sqlalchemy import Column, Integer, Text
from db import Base

class SiteContent(Base):
    __tablename__ = "site_content"
    id = Column(Integer, primary_key=True, index=True)
    json = Column(Text, nullable=False)  # contenu du front en JSON (string)
