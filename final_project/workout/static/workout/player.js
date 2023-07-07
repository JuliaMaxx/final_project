document.addEventListener('DOMContentLoaded', ()=>{
    console.log('loaded');
    const url = document.getElementById('youtube_url');
    if (url){
        url.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                playVideo();
            }
        });
    }

    function playVideo() {
        const url = document.getElementById('youtube_url').value;
        const video_id = extractVideoId(url);
        console.log(video_id);
        if (video_id){
            redirectUrl = redirectUrl.replace('__music_id__', video_id);
            redirectUrl = redirectUrl.replace('__music_type__', 'youtube');
            window.location.href = redirectUrl;
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
    const file = document.getElementById('mp3_file');
    if (file){
        file.addEventListener('change', ()=>{
            const mp3 = file.files[0];
            if (mp3) {
                const src = URL.createObjectURL(mp3); 
                redirectUrl =  redirectUrl.replace('__music_id__', src);
                redirectUrl = redirectUrl.replace('__music_type__', 'mp3');
                window.location.href = redirectUrl;   
            } 
        })
    }
})