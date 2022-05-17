import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import KakaoRedirectHandler from './routes/KakaoRedirectHandler';
import Intro from './routes/Intro';
import Signup from './routes/Signup';
import Home from './routes/Home';
import Community from './routes/Community';
import CommunityForm from './routes/CommunityForm';
import Map from './routes/Map';
import MyMoim from './routes/MyMoim';
import MoimForm from './routes/MoimForm';
import MoimDetail from './routes/MoimDetail';
import ManageMember from './routes/ManageMember';
import EvaluateMoim from './routes/EvaluateMoim';
import MyPage from './routes/MyPage';
import MyPageLikedRestaurants from './routes/MyPageLikedRestaurants';
import MyPageEvaluation from './routes/MyPageEvaluation';
import MyPageReviews from './routes/MyPageReviews';
import MyPageFeeds from './routes/MyPageFeeds';
import MyPageSetting from './routes/MyPageSetting';
import Chat from './routes/Chat';
import BottomSheetBase from './components/common/BottomSheetBase';
import ChatRoom from './components/chat/ChatRoom';
import { checkToken, onMessageListener } from './service/notification_service';
import useNotificationStatus from './hooks/useNotification';
import { deleteToken } from './api/notification';
import useUserInfo from './hooks/useUserInfo';
import PrivateRoute from './routes/PrivateRoute';
import Notification from './routes/Notification';
import Footer from './components/common/Footer';

const initialAlarmState = {
  open: false,
  message: '',
};

const mobileAlarmStyle = { vertical: 'top', horizontal: 'center' };
const desktopAlamStyle = {
  vertical: 'bottom',
  horizontal: 'right',
};

function App() {
  const [tokenId, setTokenId] = useState(null);
  const notificationStatus = useNotificationStatus();
  const userInfo = useUserInfo();
  const [alarm, setAlarm] = useState({
    ...initialAlarmState,
    ...desktopAlamStyle,
  });

  const { open, message, vertical, horizontal } = alarm;

  const handleOpenSnackbar = body => {
    const { pathname } = window.location;
    if (pathname.includes('chat') || pathname.includes('notification')) return;

    const { innerWidth: width } = window;

    const style = width < 1025 ? mobileAlarmStyle : desktopAlamStyle;

    setAlarm({
      open: true,
      message: body,
      ...style,
    });
  };

  useEffect(() => {
    if (!userInfo) return () => {};

    let unsubscribe;

    if (notificationStatus === 'default') {
      Notification.requestPermission();
    }

    if (notificationStatus === 'granted') {
      checkToken(setTokenId);
      unsubscribe = onMessageListener(handleOpenSnackbar);
    }

    if (notificationStatus !== 'granted' && tokenId !== null) {
      deleteToken(tokenId);
      setTokenId(null);
    }

    return unsubscribe;
  }, [notificationStatus, userInfo]);

  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: 로그인 필수 분기처리 */}
        <Route path="/intro" element={<Intro />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute isLoggedIn={!!userInfo} />}>
          <Route path="/map" element={<Map />} />
          <Route element={<Footer />}>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/form" element={<CommunityForm />} />
            <Route path="/mymoim" element={<MyMoim />} />
            <Route path="/moim/form" element={<MoimForm />} />
            <Route path="/moim/:moimId" element={<MoimDetail />} />
            <Route path="/moim/:moimId/member" element={<ManageMember />} />
            <Route path="/moim/:moimId/evaluation" element={<EvaluateMoim />} />
            <Route path="/mypage/:userPk" element={<MyPage />} />
            <Route
              path="/mypage/:userPk/liked-restaurants"
              element={<MyPageLikedRestaurants />}
            />
            <Route
              path="/mypage/:userPk/evaluation"
              element={<MyPageEvaluation />}
            />
            <Route
              path="/mypage/:userPk/my-reviews"
              element={<MyPageReviews />}
            />
            <Route path="/mypage/:userPk/my-feeds" element={<MyPageFeeds />} />
            <Route path="/mypage/:userPk/setting" element={<MyPageSetting />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatRoom" element={<ChatRoom />} />
            <Route path="/notification" element={<Notification />} />
          </Route>
        </Route>
      </Routes>
      <BottomSheetBase />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setAlarm({ ...alarm, ...initialAlarmState });
        }}
        message={message}
      />
    </BrowserRouter>
  );
}

export default App;
