#!/bin/bash

# Get the directory where this script is located
script_dir="$(dirname "$0")"

# Define relative paths for the source and destination folders
relative_source_folder="./dist"
relative_destination_folder="../../../blink-v2/public/resources"
new_destination_folder_name="custom-charts"

# Combine the script's directory with the relative paths
source_folder="$script_dir/$relative_source_folder"
destination_folder="$script_dir/$relative_destination_folder"

# Check if the source folder exists
if [ -d "$source_folder" ]; then
    # Check if the destination folder exists, create it if not
    if [ ! -d "$destination_folder" ]; then
        mkdir -p "$destination_folder"
    fi

    # Use the 'cp' command to copy the folder to the destination with a new name
    cp -r "$source_folder/" "$destination_folder/$new_destination_folder_name"

    echo "Folder copied to destination successfully."
else
    echo "Source folder does not exist."
fi