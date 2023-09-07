import LoadingImg from './assets/loading.png';
import './Loading.css';

export default function Loading({ children, isLoading }) {
  return (
    <>
      {children}
      <div className="Loading" style={{ display: isLoading ? 'flex' : 'none' }}>
        <img src={LoadingImg} alt="Loading" />
      </div>
    </>
  );
}
