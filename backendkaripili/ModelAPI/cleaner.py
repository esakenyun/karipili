import pandas as pd

# Load the CSV file into a DataFrame
csv_file_path = 'jobs.csv'
data = pd.read_csv(csv_file_path)

# Define a function to clean the text columns
def clean_text(text):
    if pd.isna(text):
        return text
    # Replace multiple spaces and newlines with a single space
    text = text.replace('\n', ' ').replace('              ', ' ').strip()
    return text

# Apply the clean_text function to the 'description' and 'skills' columns
data['description'] = data['description'].apply(clean_text)
data['skills'] = data['skills'].apply(clean_text)

# Save the cleaned data back to a CSV file (optional)
cleaned_csv_file_path = 'cleaned_jobs.csv'
data.to_csv(cleaned_csv_file_path, index=False)

# Display the cleaned DataFrame
print(data[['title', 'description', 'skills']])
