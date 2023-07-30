import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('capital-tracker')

    try:
        response = table.scan()
        items = response['Items']
        
        for item in items:
            item['capital'] = float(item['capital'])
            
        items.sort(key=lambda x: x['id'])
            
        formatted_data = format_data_for_chart(items)
        
        return {
            'statusCode': 200,
            'body': json.dumps(formatted_data)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def format_data_for_chart(items):
    capital = []
    
    for item in items:
        capital.append({
            'date': item['date'],
            'capital': item['capital']
        })
    
    formatted_data = {
        'labels': list(map(lambda x: x['date'], capital)),
        'datasets': [
            {
                'label': 'Capital',
                'data': list(map(lambda x: x['capital'], capital))
            }
        ]
    }
    
    return formatted_data
