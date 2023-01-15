export function signIn() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'd60dx79nasndsa9hdfs6an9dfsa79jmacsd97addysavfdgvs',
                user: {
                    name: 'Raquel',
                    email: 'email@email.com'
                }
            })
        }, 2000);
    })
}