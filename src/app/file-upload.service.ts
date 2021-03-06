import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {Observable} from 'rxjs';
import {of} from 'rxjs'
import { FileUpload } from './file-upload';
import { Request, AWSError } from 'aws-sdk/global';
import { Shared } from './shared';

//@Injectable({
  //providedIn: 'root'
//})
export class FileUploadService {

  //FOLDER = 'SdpProject/';

  BUCKET = 'mysdpproject';

  constructor() { }

  getS3Bucket(): S3 {
    const bucket = new S3(
      {

        accessKeyId: 'xxx',
        secretAccessKey: 'xxx',
        region: 'ap-south-1'
      }
    );

    return bucket;
  }

  uploadfile(file,parent) {
    var FOLDER= localStorage.getItem('user') + "/"
    const params = {
      Bucket: this.BUCKET,
      Key: parent+file.name,
      Body: file,
      ACL: 'public-read'
    };

    this.getS3Bucket().upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  getFiles(): Observable<Array<FileUpload>> {
    const fileUploads = new Array<FileUpload>();
    var FOLDER= localStorage.getItem('user') + "/"
    const params = {
      Bucket: this.BUCKET,
      Prefix: FOLDER
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(file.Key, 'https://mysdpproject.s3.amazonaws.com/' +  file.Key,file.Size));
      });
    });

    return of(fileUploads);
  }

  deleteFile(file: FileUpload) {
    const params = {
      Bucket: this.BUCKET,
      Key: file.name
    };

    this.getS3Bucket().deleteObject(params, function (err, data) {
      if (err) {
        console.log('There was an error deleting your file: ', err.message);
        return;
      }
      console.log('Successfully deleted file.');
    });
  }

  CreateDiectory(path:string) {
    const params = {
      Bucket: this.BUCKET,
      Key: path,
      ACL: 'public-read'
    }

     this.getS3Bucket().putObject(params, function (err, data) {
      if (err) {
        console.log(err)

      }
      else {
        console.log(data)

      }
    })

  }

  DeleteDirectory(path:string){
    const params = {
      Bucket: this.BUCKET,
      Key: path,

    }
    this.getS3Bucket().deleteObject(params,function(err,data){
      if(err){
        console.log(err)
      }
      else{
        console.log(data)
      }
    })
  }

  getProfile():Observable<Array<FileUpload>>{
    const fileUploads = new Array<FileUpload>();
    //var FOLDER= localStorage.getItem('user') + "/"
    const params = {
      Bucket: this.BUCKET,
      Prefix: "Profile/"+localStorage.getItem('user')+"/"
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(file.Key, 'https://mysdpproject.s3.amazonaws.com/' +  file.Key,file.Size));
      });
    });

    return of(fileUploads);
  }

  getSharedAll(list:Shared[]):Observable<Array<FileUpload[]>>{
    var fList:Array<FileUpload[]>=[]
    var final:FileUpload[]=[]
    for(var i=0;i<list.length;i++){
      fList.push(this.getShared(list[i].folder.name))
      // console.log(fList[i])
      // for(let j of fList[i]){
      //   //final.push(fList[i][j])
      //   console.log(j)
      // }
    }

    return of(fList)
  }

  getShared(pre:string):Array<FileUpload>{
    const fileUploads = new Array<FileUpload>();
    var FOLDER= pre
    const params = {
      Bucket: this.BUCKET,
      Prefix: FOLDER
    };

    this.getS3Bucket().listObjects(params, function (err, data) {
      if (err) {
        console.log('There was an error getting your files: ' + err);
        return;
      }

      console.log('Successfully get files.', data);

      const fileDatas = data.Contents;

      fileDatas.forEach(function (file) {
        fileUploads.push(new FileUpload(file.Key, 'https://mysdpproject.s3.amazonaws.com/' +  file.Key,file.Size));
      });
    });

    return fileUploads;
  }

}
