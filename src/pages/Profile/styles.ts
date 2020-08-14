import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: -176px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      width: 100%;
      font-size: 20px;
      margin-bottom: 24px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 48px;
    height: 48px;
    cursor: pointer;
    background: #ff9000;
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #321e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
