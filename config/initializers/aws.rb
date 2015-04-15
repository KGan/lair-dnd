require 'aws-sdk'
AWS.config(access_key_id: Figaro.env.aws_access_id, secret_access_key: Figaro.env.aws_access_secret)
S3_BUCKET = Figaro.env.s3_bucket
