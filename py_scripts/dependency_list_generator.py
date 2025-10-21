import json
import os

def validate(dependency_list: list):
    dependency_names = {}

    # Validation
    for dependency in dependency_list:
        if(dependency['name'] in dependency_names):
            raise ValueError(f"Duplicate dependency found: {dependency['name']}")
        else:
            dependency_names[dependency['name']] = 1

        if not os.path.exists(f"../sql_scripts/tables/{dependency['name']}"):
            raise FileNotFoundError(f"Dependency folder '{dependency['name']}/' not found in 'sql_scripts/tables/'")
        if not os.path.exists(f"../sql_scripts/tables/{dependency['name']}/create.sql"):
            raise FileNotFoundError(f"'create.sql' not found for '{dependency['name']}'")
        if not os.path.exists(f"../sql_scripts/tables/{dependency['name']}/seed.sql"):
            raise FileNotFoundError(f"'seed.sql' not found for '{dependency['name']}'")
        if not os.path.exists(f"../sql_scripts/tables/{dependency['name']}/update.sql"):
            raise FileNotFoundError(f"'update.sql' not found for '{dependency['name']}'")

def generate():

    file_name = 'dependencies.json'

    with open(file_name, 'r') as f:
        dependencies_json_list = json.load(f)
    
    validate(dependencies_json_list)

    final_dependency_list = []

    # First iteration finds all with no dependencies
    i = 0
    while i < len(dependencies_json_list):
        has_dependencies = len(dependencies_json_list[i]['dependsOn']) > 0
        if not has_dependencies:
            final_dependency_list.append(dependencies_json_list[i]['name'])
            del dependencies_json_list[i]
        else:
            i += 1

    # Subsequent iterations add dependencies whose dependencies are all met
    iterations_without_changes = 0
    while len(dependencies_json_list) > 0:
        iteration_made_a_change = False
        i = 0
        while i < len(dependencies_json_list):
            dependencies_are_satisfied = True 
            for dependency in dependencies_json_list[i]['dependsOn']:
                if dependency not in final_dependency_list:
                    dependencies_are_satisfied = False
                    break

            if dependencies_are_satisfied:
                iteration_made_a_change = True
                final_dependency_list.append(dependencies_json_list[i]['name'])
                del dependencies_json_list[i]
            else:
                i += 1
        
        if not iteration_made_a_change:
            iterations_without_changes += 1
        if iterations_without_changes > 2:
            print(dependencies_json_list)
            raise ValueError("Circular dependency detected or unresolved dependencies exist. See above for remaining dependencies.")
        
    return final_dependency_list
