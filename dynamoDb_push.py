import boto3
session = boto3.Session(profile_name='pythonAutomation', region_name="us-east-1")
client = session.client('dynamodb')

response = client.put_item(
    Item={
        'url': {
            'S': 'https://aws.amazon.com/',
        },
        'slug': {
            'S': 'aws',
        },
    },
    ReturnConsumedCapacity='TOTAL',
    TableName='dev-shortened-urls',
)

print(response)
