import smtplib, ssl
import os

port = 587

context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.zoho.com", port, context=context) as server:
    server.login(os.getenv("EMAIL"), os.getenv("EMAIL_PASSWORD"))
    # TO DO: Send email here