import csv
import json
import random


def build_choices(method1, jd_cat_name1, method2, jd_cat_name2):
    choices = [
        {'value': method1, 'text': f'"{jd_cat_name1}"'},
        {'value': method2, 'text': f'"{jd_cat_name2}"'}
    ]
    random.shuffle(choices)

    choices.append(
        {'value': 0, 'text': 'No one above is obviously better than the other.'})

    return choices


if __name__ == '__main__':
    method1 = 'original'
    method2 = 'cat_name'

    api_id_map = {}
    with open('/Users/wangkai/bigone/project/ec/aggregation/validation/search_map_validation (2)/top gmv-Table 1.csv') as csvfile:
        for row in csv.DictReader(csvfile):
            api_id = row['api_id']
            cat_name = row['cat_name']
            jd_cat_name = row['jd_cat_name']
            method = row['batch']

            if api_id not in api_id_map:
                api_id_map[api_id] = {
                    'cat_name': cat_name,
                    'method_to_jd_cat_name': {}
                }

            api_id_map[api_id]['method_to_jd_cat_name'][method] = jd_cat_name

    elements = [{
        'type': 'html',
        'name': 'info',
        'html': '<h3>Please choose a more accurate mapping category for each of the following categories.</h3>'
    }]
    for api_id in api_id_map:
        method_to_jd_cat_name = api_id_map[api_id]['method_to_jd_cat_name']

        if method1 in method_to_jd_cat_name and method2 in method_to_jd_cat_name:
            jd_cat_name1 = method_to_jd_cat_name[method1]
            jd_cat_name2 = method_to_jd_cat_name[method2]

            if jd_cat_name1 != jd_cat_name2:
                elements.append({
                    'isRequired': True,
                    'type': 'radiogroup',
                    'name': f'{api_id}|{api_id_map[api_id]["cat_name"]}',
                    'title': f'"{api_id_map[api_id]["cat_name"]}"',
                    'choices': build_choices(method1, jd_cat_name1, method2, jd_cat_name2)
                })

                if len(elements) == 5:
                    break

    surveyData = {
        'requiredText': '',
        'elements': elements
    }
    print(json.dumps(surveyData, ensure_ascii=False))
