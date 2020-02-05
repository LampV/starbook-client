<view class='container'>
    <canvas canvas-id="mycanvas" class=" {{showCanvas ? 'my-canvas-show' : 'my-canvas-hide' }}" bindlongtap='SaveCanvas' bindtap='SaveCanvas'> </canvas>
    <view wx:if='{{!showCanvas}}' bindsubmit='SubmitNote' class='dynamic no-card cu-card'>
        <view class="cu-list menu-avatar">
            <view class="cu-item">
                <view class="cu-avatar lg round" style="background-image:url({{user.avatar}});"></view>

                <view class="content flex-sub">
                    <view class="flex">
                        <view class="flex-sub">{{user.nickname}}</view>
                        <view class="flex-sub text-right text-gray text-sm">总时长：{{user.reading_hour}} h</view>
                    </view>
                    <view class="text-gray text-sm flex justify-between">
                        {{user.school}}
                    </view>
                </view>
            </view>
        </view>

        <view class="cu-form-group text-xl margin-top">
            <view class="title">书名</view>
            <input placeholder="本次阅读书籍名称" name='book_name' bindinput='BookInput' value='{{bookName}}'></input>

	    </view>
        <view class="cu-form-group text-xl margin-top">
            <view class='title'>
             阅读时长
            </view>
           
            <picker range='{{durationArray}}' bindchange='DurationChange' name='cur_duration'>
                <view class='picker text-df'>
                    {{cur_duration}} 分钟
                </view>
            </picker>
	    </view>
        
        <view class="cu-bar bg-white margin-top cu-form-group">
            <view class="title text-black">
                读书笔记
            </view>
        </view>
        <view class='cu-form-group'>
            <textarea maxlength="-1" disabled="{{modalName!=null}}"  placeholder="输入本次读书笔记内容" name='text_content' bindinput='TextInput' value='{{textContent}}'></textarea>
        </view>

        <view class="cu-bar bg-white margin-top" wx:if='{{false}}'>
            <view class="action">
                图片上传
            </view>
            <view class="action">
                {{imgList.length}}/1
            </view>
        </view>
        <view class="cu-form-group padding-bottom" wx:if='{{false}}'>
            <view class="grid col-4 grid-square flex-sub">
                <view class="bg-img" wx:for="{{imgList}}" wx:key="{{index}}" bindtap="ViewImage" data-url="{{imgList[index]}}">
                    <image src='{{imgList[index]}}' mode='aspectFill'></image>
                    <view class="cu-tag bg-red" catchtap="DelImg" data-index="{{index}}">
                        <text class="cuIcon-close"></text>
                    </view>
                </view>
                <view class="solids" bindtap="ChooseImage" wx:if="{{imgList.length<1}}">
                    <text class="cuIcon-cameraadd"></text>
                </view>
            </view>
        </view>
        <view class='padding flex flex-direction'>
            <button class='cu-btn bg-blue lg' bindtap='SubmitNote'>
                发布
            </button>
        </view>
       
    </view>
</view>