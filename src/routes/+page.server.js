import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { PRIVATE_AWS_KEY, PRIVATE_AWS_ACCESS, PRIVATE_MAX_KB, PRIVATE_AWS_PATH, PRIVATE_AWS_BUCKET, PRIVATE_LENGHT_ID } from '$env/static/private'
import {redirect} from "@sveltejs/kit";

const putObject = async (text) => {
    const client = new S3Client({
        endpoint: "https://eu2.contabostorage.com",
        region: "eu",
        credentials: {
            accessKeyId: PRIVATE_AWS_KEY,
            secretAccessKey: PRIVATE_AWS_ACCESS,
        },
        forcePathStyle: true
    });

    let id =  makeId(PRIVATE_LENGHT_ID);

    const command = new PutObjectCommand({
        Bucket: PRIVATE_AWS_BUCKET,
        Key: PRIVATE_AWS_PATH + id,
        Body: text,
        ContentType: 'text/plain'
    });

    try {
        await client.send(command);
        return id;
    } catch (err) {
        console.error(err);
    }
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const text = formData.get('text');

        if(text) {
            if(new Blob([text]).size <= PRIVATE_MAX_KB){
                let id = await putObject(text);
                throw redirect(302, '/' + id);

            }else {
                return {success: false};
            }
        }else{
            return { success: false };
        }
    },
};

const makeId = (length = 5) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}