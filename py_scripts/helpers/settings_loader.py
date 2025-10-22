import json

def load():
    with open('settings.json', 'r') as f:
        settings_json = json.load(f)
    return settings_json

def get_connection_string():
    settings = load()
    return settings['connectionString']