let textArea = document.getElementById("TweetInput");

let CountText = () => {
    let TweetInputRemain = 256 - textArea.value.length;
    if (TweetInputRemain === 0) {
        document.getElementById("charCount").innerHTML = `${TweetInputRemain} left`.fontcolor("red")
        alert("Dude! That's a lot of stuffs on your mind! Try Facebook instead!!!");
    } else { document.getElementById("charCount").innerHTML = `${TweetInputRemain} left` };
}
textArea.addEventListener("input", CountText);
let id = 0;
let sourceTweetData = [];
let childTweet = [];

let pushTweet = () => {
    let contentTweet = textArea.value;
    let aTweet = {
        ID: id += 1,
        contents: contentTweet,
        name: "elon musk",
        email: "@elonmusk",
        likestatus: ""
    };
    sourceTweetData.unshift(aTweet);
    console.log(aTweet);
    console.log(sourceTweetData);
    render(sourceTweetData);
};


let shareTweet = (tweetID) => {
    // let ashareTweet = {
    //     ID: id += 1,
    //     contents: "contentTweet",
    //     name: "elon musk",
    //     email: "@elonmusk",
    //     likestatus: ""
    //     parentsID: tweetID
    // };
    // sourceTweetData.unshift(ashareTweet);
    // console.log(ashareTweet);
    // console.log(sourceTweetData);
    render(sourceTweetData);
    console.log("it works");
    console.log(tweetID);
};


let render = (array) => {
    let Originaltweetdisplay = array.map((item) => {
        return `            <div class="card m-3 pb-3" style="border-radius: 15px;">
        <div class=" row no-gutters ">
            <div class="col-md-2 pl-4 pt-3" style="border-right: solid 1px whitesmoke;">
                <div style=" width: 75px; height: 75px; background-color: aqua; border-radius: 50px;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzCUrdNcBGV1DkgZrDxnb_alfTpdyVh_wVzYcPRPkd4xGtEZyc" class="card-img" alt="..." style="width: 100%; border-radius: 50px;"></div>
            </div>
            <div class="col-md-10 pl-0">
                <div class="card-body pl-0 pt-4 pb-0 ">
                    <h5 id="accountname" class="card-title ">${item.name}</h5>
                    <h6 id="accountemail" class="card-title ">${item.email}</h6>
                </div>
            </div>
            <div class="pl-4 pt-3">
                <p class="card-text ">${item.contents}</p>
                <p class="card-text "><small class="text-muted ">Last updated 3 mins ago</small></p>
                <div class="">
                    <button type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> <img src="https://webstockreview.net/images250_/instagram-clipart-cool-3.png" alt="" style="width: 15px"> This's lit!</button>
                    <button type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;"> <img src="https://i.pinimg.com/originals/bf/7c/97/bf7c97be8f1b714b588642446c7a180c.gif" alt="" style="width: 15px;"> Not cool!</button>
                    <button onclick="shareTweet(${item.ID})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Reply</button>
                    <button onclick="shareTweet(${item.ID})" type="button" class="btn btn-outline-primary btn-lg" style="font-size: 13px;">Everyone should see this</button>
                </div>
            </div>
        </div> </div>`
    }).join("");
    document.getElementById("tweetdisplayarea").innerHTML = Originaltweetdisplay;
    console.log(Originaltweetdisplay);

}