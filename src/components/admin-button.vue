<template>
    <div class="admin-button" :style="{ 'width': nowStyle.w + 'px', height: nowStyle.h + 'px' }" >
        <button class="button" :class="{ 'button-white': type === 'default' ,'inactive':inactive}" @click="click">{{ text }}</button>
    </div>
</template>

<script>
    export default {
        name: 'admin-button',
        props: {
            text: {
                type: String,
                require: true
            },
            size: {
                type: String,
                default: 'md'
            },
            type: {
                type: String,
                default: 'primary'
            },
            inactive:{
                type: Boolean,
                default: false
            },
        },
        computed: {
            nowStyle() {
                let h, w;
                switch (this.size) {
                    case 'lg':
                        w = 363;
                        h = 56;
                        break;
                    case 'md':
                        w = 160;
                        h = 40;
                        break;
                    case 'sm':
                        w = 120;
                        h = 40;
                        break;
                    case 'ls':
                        w = 90;
                        h = 38;
                        break;
                    case 'lt':
                        w = 88;
                        h = 32;
                        break;
                }
                return {
                    h,
                    w
                };
            }
        },
        methods: {
            click() {
                !this.inactive && this.$emit('click');
            }
        }
    };
</script>
<style lang="scss">
     
    .admin-button {
        display: inline-block;
        // @extend %pointer;
        .button {
            width:100%;
            height:100%;
            background:rgba(64, 158, 255, 1);
            box-shadow:0px 0px 4px 0px rgba(0,19,12,0.15);
            border-radius:4px;
            cursor: pointer;
            outline: none;
            border: none;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            &:hover {
                background: rgba(64, 158, 255, 0.8);
            }

            &:active {
                background: rgba(64, 158, 255, 1);
            }
        }

        .button-white {
            color: rgba(74, 74, 74, 1);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(231, 235, 235, 1);
            &:hover {
                background: rgba(239, 242, 241, 1);
            }

            &:active {
                background: rgba(234, 237, 236, 1);
            }
        }
        .inactive{
            background: #cccccc !important;
            opacity: .5;
        }
    }

</style>
