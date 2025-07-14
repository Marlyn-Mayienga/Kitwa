from django.core.files.storage import FileSystemStorage

# A better way to save files on the disk

def save_file(request, file_name):
    myfile = request.FILES[f'{file_name}']
    fs = FileSystemStorage()
    filename = fs.save(myfile.name, myfile)
    uploaded_file_url = fs.url(filename)
    return uploaded_file_url