import {toast} from 'react-toastify'
export const uploadError=(error)=>{
switch (error.code) {
    case 'storage/unauthorized':
        toast.error("User doesn't have permission to access the object")
        break;
    case 'storage/canceled':
        toast.error("User canceled the upload")
        break;
    case 'storage/unknown':
        toast.error("Unknown error occurred, inspect error.serverResponse")
        break;
    default:
        toast.error('error')
}
}
export const uploadProgress = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    toast.success('Upload is ' + progress + '% done');
    switch (snapshot.state) {
        case 'paused':
            toast.warning('Upload is paused');
            break;
        case 'running':
            console.log('Uploading . . .');
            break;
        default:
            toast.warning('uploading')
    }

}