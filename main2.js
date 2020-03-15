let textArea = document.getElementById("TweetInput");

let CountText = () => {
  let TweetInputRemain = 256 - textArea.value.length;
  if (TweetInputRemain === 0) {
    document.getElementById(
      "charCount"
    ).innerHTML = `${TweetInputRemain} left`.fontcolor("red");
    alert("Dude! That's a lot of stuffs on your mind! Try Facebook instead!!!");
  } else {
    document.getElementById("charCount").innerHTML = `${TweetInputRemain} left`;
  }
};
textArea.addEventListener("input", CountText);
let id = 0;
let sourceTweetData = [];
let childTweet = [];
let likestatus = false;
let likeButtonDisplay = `<button type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Like it?</button>`;
let dislikestatus = false;
let disLikeButtonDisplay = `<button type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> Dislike?</button>`;
let tag = "";
let tagArray = [];

let pushTweet = () => {
  // let parentsid = null;
  let tagArray = document.getElementById("tagtext");
  if (tagArray != null) {
    tagArray = tagArray.value.split(" ");
    tag = tagArray
      .map(item => {
        return `<button onclick="searchTag(${item})" type="button" class="btn btn-light">${item}</button>`;
      })
      .join(" ");
  }
  let abc = textArea.value;
  let contentTweet;
  if (abc.length > 0) {
    contentTweet = abc.replace(/@(\S+)/, '<a href="">$&</a>');
  }
  let aTweet = {
    id: (id += 1),
    contents: contentTweet,
    name: "elon musk",
    email: "@elonmusk",
    likestatus,
    likeButtonDisplay,
    dislikestatus,
    disLikeButtonDisplay,
    tagArray,
    tag,
    comments: []
  };
  sourceTweetData.unshift(aTweet);
  // console.log(aTweet);
  let displaytaginput = ``;
  document.getElementById("tagInput").innerHTML = displaytaginput;
  console.log(sourceTweetData);
  console.log("đang chạy push tweet");
  render(sourceTweetData);
};

let shareTweet = originaltweetid => {
  let tweetContents = document.getElementById("reTweetInput").value;
  console.log(tweetContents);
  let aTweet = {
    id: (id += 1),
    contents: tweetContents,
    name: "elon musk",
    email: "@elonmusk",
    likestatus,
    likeButtonDisplay,
    dislikestatus,
    disLikeButtonDisplay,
    parentsid: originaltweetid,
    tagArray,
    tag,
    comments: []
  };
  sourceTweetData.unshift(aTweet);
  document.getElementById("reTweetInputDisplay").innerHTML = "";
  console.log(sourceTweetData);
  console.log("đã push dc retweet, cb chạy render");
  render(sourceTweetData);
};

let deleteTweet = TweetID => {
  console.log("trigger delete");
  let newArray = sourceTweetData.filter(
    item => item.id != TweetID && item.parentsid != TweetID
  );
  sourceTweetData = newArray;
  // console.log(newArray);
  // console.log(sourceTweetData);
  render(sourceTweetData);
};

let likeTweet = TweetID => {
  console.log("trigger like");
  let tweetIndex = sourceTweetData.findIndex(item => item.id === TweetID);
  sourceTweetData[tweetIndex].likestatus = !sourceTweetData[tweetIndex]
    .likestatus;
  // console.log(sourceTweetData);
  if (sourceTweetData[tweetIndex].likestatus) {
    sourceTweetData[
      tweetIndex
    ].likeButtonDisplay = `<button type="button" class="btn btn-primary btn-lg" style="font-size: 13px;"> <img src="https://webstockreview.net/images250_/instagram-clipart-cool-3.png" alt="" style="width: 15px"> Lit!</button>`;
  } else {
    sourceTweetData[
      tweetIndex
    ].likeButtonDisplay = `<button type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> <img src="https://webstockreview.net/images250_/instagram-clipart-cool-3.png" alt="" style="width: 15px"> Like it?</button>`;
  }
  render(sourceTweetData);
};

let disLike = TweetID => {
  console.log("trigger dislike");
  let tweetIndex = sourceTweetData.findIndex(item => item.id === TweetID);
  sourceTweetData[tweetIndex].dislikestatus = !sourceTweetData[tweetIndex]
    .dislikestatus;
  // console.log(sourceTweetData);
  if (sourceTweetData[tweetIndex].dislikestatus) {
    sourceTweetData[
      tweetIndex
    ].disLikeButtonDisplay = `<button type="button" class="btn btn-primary btn-lg" style="font-size: 13px;"> <img src="https://i.pinimg.com/originals/bf/7c/97/bf7c97be8f1b714b588642446c7a180c.gif" alt="" style="width: 15px"> Trash!</button>`;
  } else {
    sourceTweetData[
      tweetIndex
    ].disLikeButtonDisplay = `<button type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> Dislike?</button>`;
  }
  render(sourceTweetData);
};

let comment = TweetID => {
let tweetIndex = sourceTweetData.find(item => item.id === TweetID);
  let newComment = prompt("Lets comment something:");
  let newCommentObject = {
    id: id,
    name: "elon musk",
    email: "@elonmusk",
    content: newComment,
    parentsid: TweetID,
    originContent: tweetIndex.contents,
    likestatus,
    likeButtonDisplay,
    dislikestatus,
    disLikeButtonDisplay,
    tagArray,
    tag
  };
  
  tweetIndex.comments.push(newCommentObject);
  render(sourceTweetData);
  id++;

};

let tagInputPopUp = () => {
  let displaytaginput = `<div class=" row no-gutters pl-3 pr-3 pb-3">
    <input id="tagtext" type="text" class="pl-3" style="width: 100%;height: 40px; border-radius: 10px; border: 1px solid lightgrey;" placeholder="Tag(s) should be a continuous set of characters and seperated by a space" maxlength="256">
    </input>
</div>`;
  document.getElementById("tagInput").innerHTML = displaytaginput;
};

let searchTag = text => {
  console.log("trigger search tag");
  // console.log(text);
  let tweetWithTagNotNull = sourceTweetData.filter(
    item => item.tagArray != null
  );
  // console.log(tweetWithTagNotNull);
  let tweetWithTag = tweetWithTagNotNull.filter(item =>
    item.tagArray.some(value => value == text)
  );
  // console.log(tweetWithTag);
  render(tweetWithTag);
};

let reTweetInputPopUp = tweetID => {
  let displayretweetinput = `<div class=" row no-gutters p-4">
    <input id="reTweetInput" type="text " class="p-0 pl-3 mr-3" style="width: 70%; height: 35px; border-radius: 10px; border: 1px solid lightgrey; " placeholder="Add comment" maxlength="256">
    </input>
    <button onclick="shareTweet(${tweetID})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;width: 10%;">Done</button>
</div>`;
  document.getElementById(
    "reTweetInputDisplay"
  ).innerHTML = displayretweetinput;
};

// let tagUser = (doc) => {
//     let entries = doc.querySelectorAll('div#tweetContents'),
//         i;
//     if (entries.length > 0) {
//         for (i = 0; i < entries.length; i = i + 1) {
//             entries[i].innerHTML = entries[i].innerHTML.replace(/@(\S+)/, '<a href="">@$1</a>');
//         }
//     }
// };

// wrong part was because you pass the second argument from shareTweet,
//when you pass the parentsId, and back to render,
//according to your logic, it will automatically think all tweets in the list are retweet,
//even though there are retweets and original tweet mix in the list
//so i remove the second argeuemtn and when we render, it will distinguish its retweet or original tweet. not from shareTWeet or pushTweet function
let render = (array) => {
    document.getElementById("TweetInput").value = "";
    let Originaltweetdisplay = array.map((item) => {
        if (item.parentsid) {
            let ParentsTweet = sourceTweetData.find((e) => e.id === item.parentsid)
            return `
              <div><div class="card m-3 pb-3" style="border-radius: 15px;">
                  <div class=" row no-gutters ">
                      <div class="col-md-2 pl-4 pt-3">
                          <div style=" width: 75px; height: 75px; background-color: aqua; border-radius: 50px;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzCUrdNcBGV1DkgZrDxnb_alfTpdyVh_wVzYcPRPkd4xGtEZyc" class="card-img" alt="..." style="width: 100%; border-radius: 50px;"></div>
                      </div>
                      <div class="col-md-10 pl-0">
                          <div class="card-body pl-0 pt-4 pb-0 ">
                              <h5 id="accountname" class="card-title ">${item.name}</h5>
                              <h6 id="accountemail" class="card-title ">${item.email}</h6>
                          </div>
                      </div>
                      <div class="pl-4 pt-3">
                          <p class="card-text text-break pr-3">${item.contents}</p>
                          <p id="tagDisplayArea" class="card-text ">
                                  ${item.tag}</p>
                          <p class="card-text "><small class="text-muted ">Last updated 3 mins ago</small></p>
                          <div class="">
                          <span id="likeButton" onclick="likeTweet(${item.id})">${item.likeButtonDisplay}</span>
                          <span id="disLikeButton" onclick="disLike(${item.id})">${item.disLikeButtonDisplay}</span>
                              <button onclick="comment(${comment.id})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Reply</button>
                              <button onclick="shareTweet(${item.id})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Everyone should see this</button>                                  
                              <button onclick="deleteTweet(${item.id})"type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> <img src="https://cdn1.iconfinder.com/data/icons/ios-and-android-line-set-2/52/delete__remove__trash__dustbin-512.png" alt="" style="width: 15px"> Delete</button>

                          </div>
                      </div>
                  </div>
                  <div class=" row no-gutters ">
                      <div class="col-md-1 d-flex justify-content-center pt-4">
                  </div>
                  <div class="col-md-11 pl-4 pb-4" style="border-left: solid 2px lightgray;">
                      <div class=" row no-gutters ">
                          <div class="col-md-2 pt-3">
                              <div style=" width: 75px; height: 75px; background-color: aqua;border-radius: 50px;"><img src="https://i.ya-webdesign.com/images/designer-vector-avatar-2.png" class="card-img" alt="..." style="width: 100%;"></div>
                          </div>
                          <div class="col-md-10">
                              <div class="card-body pl-0 pt-4 pb-0 ">
                                  <h5 class="card-title ">${ParentsTweet.name}</h5>
                                  <h6 class="card-title ">${ParentsTweet.email}</h6>
                              </div>
                          </div>
                          <div class="pt-3 pr-4">
                              <p class="card-text text-break pr-3">${ParentsTweet.contents}</p>
                              <p id="tagDisplayArea" class="card-text ">
                                  ${ParentsTweet.tag}</p>
                              <p class="card-text "><small class="text-muted ">Last updated 3 mins ago</small></p>
                              <div class="">
                              <span id="likeButton" onclick="likeTweet(${ParentsTweet.id})">${ParentsTweet.likeButtonDisplay}</span>
                              <span id="disLikeButton" onclick="disLike(${ParentsTweet.id})">${ParentsTweet.disLikeButtonDisplay}</span>
                              <button onclick="comment(${item.id})" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Reply</button>
                                  <button onclick="shareTweet(${ParentsTweet.id})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Everyone should see this</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  </div></div>`
        } else {
            return `
                  <div class="card m-3 pb-3" style="border-radius: 15px;">
                      <div class=" row no-gutters ">
                          <div class="col-md-2 pl-4 pt-3">
                              <div style=" width: 75px; height: 75px; background-color: aqua; border-radius: 50px;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzCUrdNcBGV1DkgZrDxnb_alfTpdyVh_wVzYcPRPkd4xGtEZyc" class="card-img" alt="..." style="width: 100%; border-radius: 50px;"></div>
                          </div>
                          <div class="col-md-10 pl-0">
                              <div class="card-body pl-0 pt-4 pb-0 ">
                                  <h5 id="accountname" class="card-title ">${item.name}</h5>
                                  <h6 id="accountemail" class="card-title ">${item.email}</h6>
                              </div>
                          </div>
                          <div class="pl-4 pt-3">
                              <p id="tweetContents" class="card-text text-break pr-3">${item.contents}</p>
                              <p id="tagDisplayArea" class="card-text ">
                                  ${item.tag}</p>
                              <p class="card-text "><small class="text-muted ">Last updated 3 mins ago</small></p>
                              <div class="">
                              <span id="likeButton" onclick="likeTweet(${item.id})">${item.likeButtonDisplay}</span>
                              <span id="disLikeButton" onclick="disLike(${item.id})">${item.disLikeButtonDisplay}</span>
                              <button onclick="comment(${item.id})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Reply</button>
                                <button onclick="commentInput(${comment.id})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Everyone should see this</button>
                                  <button onclick="reTweetInputPopUp(${item.id})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Everyone should see this</button>
                                  <button onclick="deleteTweet(${item.id})"type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> <img src="https://cdn1.iconfinder.com/data/icons/ios-and-android-line-set-2/52/delete__remove__trash__dustbin-512.png" alt="" style="width: 15px"> Delete</button>
                                </div>
                          </div>
                          <div id="reTweetInputDisplay" style="width: 100%;">
                          </div>
                      </div>
                  </div>`
        };
    }).join("");
    // console.log(Originaltweetdisplay);
    document.getElementById("tweetdisplayarea").innerHTML = Originaltweetdisplay;
    // let entries = document.querySelectorAll('div#tweetContents');
}