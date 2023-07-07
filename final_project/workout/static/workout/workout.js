document.addEventListener('DOMContentLoaded', ()=>{
    const url = document.getElementById('youtube_url');
    url.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            playVideo();
        }
    });

    function playVideo() {
        const url = document.getElementById('youtube_url').value;
        const video_id = extractVideoId(url);
        console.log(video_id);
        if (video_id){
            window.location.href = redirectUrl.replace('__video_id__', video_id);
        }
    }

    function extractVideoId(url) {
        let video_id = null;
        const regex = /[?&]v=([^&#]+)/;
        const match = url.match(regex);
        
        if (match) {
            video_id = match[1];
        }
        
        return video_id;
    }
})