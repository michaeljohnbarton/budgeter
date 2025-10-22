import os

def create_generated_if_not_exists():
    directory = "generated"
    if not os.path.exists(directory):
        os.makedirs(directory)