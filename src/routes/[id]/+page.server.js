import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { PRIVATE_AWS_KEY, PRIVATE_AWS_ACCESS, PRIVATE_AWS_PATH, PRIVATE_AWS_BUCKET, PRIVATE_LENGHT_ID } from '$env/static/private'
import hljs from 'highlight.js';

export async function load({ params }) {
    const client = new S3Client({
        endpoint: "https://eu2.contabostorage.com",
        region: "eu",
        credentials: {
            accessKeyId: PRIVATE_AWS_KEY,
            secretAccessKey: PRIVATE_AWS_ACCESS,
        },
        forcePathStyle: true
    });

    const command = new GetObjectCommand({
        Bucket: PRIVATE_AWS_BUCKET,
        Key: PRIVATE_AWS_PATH + params.id,
    });

    try {
        let res = await client.send(command);
        let text = await res.Body.transformToString();
        let highlightedCode;

        if(text) {
            highlightedCode = hljs.highlightAuto(
                text,
            ).value
        }


        return {
            exist: true,
            id: params.id,
            text: text,
            highlight: highlightedCode
        };
    } catch (err) {
        return {
            exist: false,
        };
    }
}