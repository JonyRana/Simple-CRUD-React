import React, {Component} from 'react';
import request  from 'superagent';
import Dropzone from 'react-dropzone';

class Upload extends Component {
     constructor(props){
          super(props);
          this.state={
               file: '',
               imagePreviewUrl: ''
          }
          //this.getImage = this.getImage.bind(this);
          //this.saveImage = this.saveImage.bind(this);
     }
     onDrop(files) {
     request.post('http://127.0.0.1:3001/users/upload')
     .attach('theseNamesMustMatch', files[0])
     .end((err, res) => {
       if (err) console.log(err);
       alert('File uploaded!');
     })
          }
     // getImage(event){
     //      event.preventDefault();
     //      let reader = new FileReader();
     //      let file = event.target.files[0];
     //      this.setState({
     //           file:file,
     //           imagePreviewUrl: reader.result
     //      });
     //      reader.readAsDataURL(file)
     //
     // }
     // saveImage(event){
     //      event.preventDefault();
     //      console.log(this.state.file);
     //      request
     //      .post("http://127.0.0.1:3001/users/upload")
     //      .send({file:this.state.file})
     //      .accept("pplication/json")
     //      .end(function(err, res){
     //           if(err){
     //                alert(err);
     //           }
     //           else{
     //                alert(res.msg);
     //           }
     //      })
     //
     // }
     render(){

          return(
               <div>
          <Dropzone onDrop={this.onDrop}>
            <div>Try dropping a file here, or click to select a file to upload.</div>
          </Dropzone>
          </div>
          )
     }
}
export default Upload;
