<template>
    <section>
        <md-layout md-column md-align="center">
            <md-layout md-column md-align="center" class="gc-memories-title">
                <h3>活動回顧</h3>
                <h6>
                    我們辦過不同的交流活動，包含 SpeakEasy 麻將和桌遊、台灣熱炒夜、<br>
                    聖誕冬至分享趴等。希望透過有趣的互動環節，讓每個參與者<br>
                    都可以在活動中自在開口、輕鬆交流！
                </h6>
            </md-layout>
            <md-layout md-column md-align="center">
                <md-layout class="work-3col" style="flex-wrap: nowrap"> 
                    <figure>
                        <div class="gallery-img">
                            <a href="https://www.facebook.com/media/set/?set=a.1901004900142960.1073741844.1604262479817205&amp;type=1&amp;l=df3c981b04" target="_blank"
                                title="台灣精釀啤酒國際交流夜 | Facebook 相簿" >
                                <img class="rounded" src="/static/img/gallery1.jpg" alt="">
                            </a>
                        </div>
                        <figcaption>
                            <h3>台灣精釀啤酒國際交流夜</h3>
                            <p>Taiwan Craft Beer Night</p>
                        </figcaption>
                    </figure>
                    <figure>
                        <div class="gallery-img">
                            <a href="https://www.facebook.com/media/set/?set=a.1937818546461595.1073741848.1604262479817205&amp;type=1&amp;l=44b88fcd60" target="_blank"
                                title="SpeakEasy 語言輕鬆說麻將桌遊場 | Facebook 相簿">
                                <img class="rounded" src="/static/img/gallery5.jpg" alt="">
                            </a>
                        </div>
                        <figcaption>
                            <h3>SpeakEasy 語言輕鬆說</h3>
                            <p>Theme Language Exchange</p>
                        </figcaption>
                    </figure>
                    <figure>
                        <div class="gallery-img">
                            <a href="https://www.facebook.com/media/set/?set=a.1930485910528192.1073741847.1604262479817205&amp;type=1&amp;l=6b3d557c77" target="_blank"
                                title="國際野餐趣 | Facebook 相簿">
                                <img class="rounded" src="/static/img/gallery7.jpg" alt="">
                            </a>
                        </div>
                        <figcaption>
                            <h3>國際野餐趣</h3>
                            <p>Let's Go Picnic</p>
                        </figcaption>
                    </figure>
                </md-layout>
                <a title="FRNCi Themed Events | FRNCi-Friends&amp;City" 
                    href="https://www.frnci.com/events/" target="_blank" class="highlight-button-default-green">
                    未來還有更多主題式交流活動，就等你來參加囉！
                </a>
            </md-layout>
        </md-layout>
    </section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
section {
    padding-bottom: 10%;

    .gc-memories-title {
        h3 {
            color: #343d3c;
            font-size: 1.8rem;
            margin: 0;
        }

        h6 {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4rem;
        }
    }

    .work-3col {
        margin-left: 6%;
        margin-right: 6%;

        figure {
            margin: 0 1.5%;
        }

        figcaption {
            margin-top: 5%;
            
            h3 {
                margin-bottom: 0.8rem;
                font-size: 1.5rem;
                line-height: 1rem;
            }

            p {
                margin: 0;
                font-size: 1rem;
            }
        }
    }

    .highlight-button-default-green {
        border: 2px solid #60bc90;
        background-color: #60bc90;
        padding: 8px 20px;
        color: #fff !important;
        margin: 0 auto;
        margin-top: 5%;
        white-space: unset;
        display: inline-block;
        font-weight: 600;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:hover {
            text-decoration: none;
        }
    }
}

@media (max-width: 575.98px) {
    section {
        .gc-memories-title {
            margin: 0 1rem;

            h6 {
                margin: 1rem 0;
            }
        }

        .work-3col {
            figure {
                margin: 1rem 0;
            }
        }

        .highlight-button-default-green {
            margin: 0;
        }
    }
}
</style>
