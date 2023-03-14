# Use an existing Python image as a base
FROM python

# Set the working directory
WORKDIR /app

# Copy required files into the image
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy into the image
COPY . .

# Launch the Flask application on container startup
CMD ["python", "app.py"]