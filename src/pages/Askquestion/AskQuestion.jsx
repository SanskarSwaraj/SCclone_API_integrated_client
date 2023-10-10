import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import camera from '../../assets/camera-solid.svg'
import testimage from '../../assets/testimage.jpeg'
import './AskQuestion.css'
import { askQuestion } from '../../actions/question'
import axios from 'axios'
import $ from 'jquery';





const AskQuestion = () => {
  const [ isCameraSearch, setIsCameraSearch ] = useState(false)


  const [ questionTitle, setQuestionTitle ] = useState('')
  const [ questionBody, setQuestionBody ] = useState('')
  const [ questionTags, setQuestionTags ] = useState('')

  // const handleToggle = () => {
  //   setIsCameraSearch (!isCameraSearch)
  // }
  

  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

 

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({questionTitle, questionBody, questionTags})
    dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate))
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      setQuestionBody(questionBody + "\n")
    }
  }
  

    const help = (file) => {
      var formData = new FormData();
      formData.append('image', file);
      $.ajax({
          method: 'POST',
          mode: 'cors',
          url: 'https://api.api-ninjas.com/v1/imagetotext',
          headers: {
              'X-Api-Key': 'gg9PsF+9edUuMGoc6GXAag==Pix6MFKLyh93uCWc'
          },
          data: formData,
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false, 
          success: function(result) {
          var answer = "";
              result.map((element) => {
                answer +=  `${element.text} `;
              });
              setQuestionBody(answer);

          },
          error: function ajaxError(jqXHR, textStatus, errorThrown) {
              alert(jqXHR.responseText);
            }
      });
    }


    const [file, setFile] = useState(null);

  return ( 
      <div className="ask-question">
        <div className="ask-ques-container">
          <h1>Ask a public question</h1>
          <form onSubmit={handleSubmit}>
            <div className="ask-form-container">
              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>Be specific and imagine you're asking to a real person</p>
                <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='Type your question here'/>
              </label>
              <label htmlFor="ask-ques-body">






              <div className='cameraimg'>
                <h4>Body</h4>&nbsp; &nbsp; &nbsp;

                <a href="#" id="camera_search" onClick={() => {setIsCameraSearch (!isCameraSearch)}}><img src={camera} alt="camera" style={{height:'15px',width:'15px'}}/></a>&nbsp; &nbsp; &nbsp;
                { isCameraSearch && (
                  
                <input type="file" id="camera_search_input" name="camera_search_input" accept="image/png, image/jpeg" 
                // onChange={help()}'
                onChange={(file) => {
                  help(file.target.files[0])
                }}
                />

                

                )
                }
              </div>








                <p>Include all the information someone would need to answer your question</p>
                <textarea name="" id="ask-ques-body" value={questionBody} onChange={(e) => {setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
              </label>
              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add upto 5 tags to describe what your question is about</p>
                <input type="text" id='ask-ques-tags' onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder='e.g (xml javascript css)'/>
              </label>
            </div>
            <input type="submit" value='review your question' className='review-btn'/>
          </form>
        </div>
      </div>
  )
}

export default AskQuestion
