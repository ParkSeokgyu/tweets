
// 비밀번호 최소 허용 글자
export const PASSWORD_MIN_LENGTH = 8;

// 비밀번호 최소 허용 글자 에러 메세지
export const PASSWORD_MIN_LENGTH_ERROR = "비밀번호는 8자 이상이어야 합니다.";


// 비밀번호 정규 표현식(포함되어야 하는 문자)
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*\d).+$/
);

// 비밀번호 정규 표현식 에러 메세지
export const PASSWORD_REGEX_ERROR = "비밀번호는 숫자를 하나 이상 포함해야 합니다.";



