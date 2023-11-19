import boto3
import os
import json
import urllib.parse
import hashlib
import hmac
import io,zipfile

print('Loading function')

def lambda_handler(event, context):
    print("event header:::", event['headers'])
    print("event header:::", event['body'])
    body = json.loads(event['body'])
    branch_name = body['push']['changes'][0]['new']['name']
    repo_name = body['repository']['name']
    print("Branch and repo_name", branch_name, repo_name)
    commit_id = body['push']['changes'][0]['new']['target']['hash'][:7]
    ##Write file data
    file_data = {
        "branch_name": branch_name,
        "repo_name": repo_name
    }
    file_name = "{}/{}/metadata.zip".format(repo_name,branch_name)
    # with open("/tmp/metadata.zip", 'w') as f:
    #     f.write(json.dumps(file_data))

    file_contents = io.BytesIO(json.dumps(file_data).encode())
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, mode='w') as zipf:
        # Add the file to the zip archive
        zipf.writestr('metadata.json', file_contents.getvalue())
    buffer.seek(0)
    with open('/tmp/metadata.zip', 'wb') as f:
        f.write(buffer.read())
    ##Push to s3
    s3 = boto3.client('s3');
    s3.upload_file("/tmp/metadata.zip",os.environ['BUCKET'],file_name)

    return 200
