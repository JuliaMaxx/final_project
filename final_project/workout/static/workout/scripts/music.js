document.addEventListener('DOMContentLoaded', ()=>{
    // get youtube url provided in the input field 
    const url = document.getElementById('youtube_url');

    if (url){
        // if enter is pressed - redirect the user to the player with their video
        url.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                playVideo();
            }
        });
    }

    function playVideo() {
        // get video id from the provided url
        const video_id = extractVideoId(url.value);

        if (video_id){
            // redirect user to the player url
            redirectUrl = redirectUrl.replace('__music_id__', video_id);
            window.location.href = redirectUrl;
        }
    }

    function extractVideoId(url) {
        let video_id = null;
        // look for characters "?v=" followed by characters that are not "&" or "#"
        const regex = /[?&]v=([^&#]+)/;
        const match = url.match(regex);
        // if match is found it assign captured video id to the video_id variable
        if (match) {
            video_id = match[1];
        }
        return video_id;
    }

    // sumbit the form with mp3 file when the user selects one
    const mp3_input = document.querySelector('.file_input');
    if (mp3_input){
        mp3_input.addEventListener('change', ()=>{
            document.querySelector('.mp3_form').submit();
        })
    }
})