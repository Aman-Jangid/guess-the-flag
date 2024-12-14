import json
import os

# Paths
json_file_path = '/home/aman/Documents/Code/TeamProjects/devvit_projects/devvit-apps/src/data/dataBKP.json'
flags_folder_path = '/home/aman/Documents/Code/TeamProjects/devvit_projects/devvit-apps/src/data/flags'

# Load the JSON data
with open(json_file_path, 'r') as file:
    data = json.load(file)

# Filter the data to include only countries with existing flag files
filtered_data = {}
for code, country in data.items():
    flag_file_path = os.path.join(flags_folder_path, f"{code}.svg")
    if os.path.exists(flag_file_path):
        filtered_data[code] = {
            "country": country,
            "flag": f"/flags/{code}.svg"
        }

# Save the filtered data back to a new JSON file
output_file_path = '/home/aman/Documents/Code/TeamProjects/devvit_projects/devvit-apps/src/data/countries_with_flags.json'
with open(output_file_path, 'w') as file:
    json.dump(filtered_data, file, indent=4)

print(f"Filtered JSON file saved at: {output_file_path}")
