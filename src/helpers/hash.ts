import bcrypt from 'bcrypt';


export let hash = async (data: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
};

