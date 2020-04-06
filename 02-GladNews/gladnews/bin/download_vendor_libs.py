import os
import urllib.request
'''Impoort Vender Libs'''

def create_directory(dirName):
	print(dirName)
	if not os.path.exists(dirName):
		os.makedirs(dirName)
		print("Directory " , dirName ,  " Created ")
	else:    
		print("Directory " , dirName ,  " already exists")

def downloadLibs(libName, libUrl):
	print('Beginning file download file: {} .'.format(libName))
	urllib.request.urlretrieve(libUrl, libName)
	

def main():
	create_directory('../static/js')
	create_directory('../static/css')
	create_directory('../static/aws-sdks')
	downloadLibs('../static/css/bootstrap-theme-3.3.7.min.css','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css')
	downloadLibs('../static/css/bootstrap-3.3.7.min.css','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
	downloadLibs('../static/js/bootstrap-3.3.7.min.js','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
	downloadLibs('../static/js/jquery-1.12.4.min.js','https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js')
	downloadLibs('../static/aws-sdks/aws-sdk.v2.36.0.min.js','https://raw.githubusercontent.com/aws/aws-sdk-js/v2.36.0/dist/aws-sdk.min.js')
	downloadLibs('../static/aws-sdks/amazon-cognito-sdk.v1.16.0.min.js','https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/v1.16.0/dist/aws-cognito-sdk.min.js')
	downloadLibs('../static/aws-sdks/amazon-cognito-identity.v1.16.0.min.js','https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/v1.16.0/dist/amazon-cognito-identity.min.js')
	
if __name__ == '__main__':
    main()
