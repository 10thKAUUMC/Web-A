// src/apis/lp.ts
import { axiosInstance } from './axios';
import type {
  PaginationDto,
  RequestLpDto,
  ApiResponse,
  LpListResponse,
  LpDetail,
  Comment,
  CommentListResponse,
} from '../types/lp';

// 1. LP 목록 조회
export const getLpList = async (params: PaginationDto) => {
  const response = await axiosInstance.get<ApiResponse<LpListResponse>>('/lps', {
    params,
  });
  return response.data.data;
};

// 2. 특정 유저가 생성한 LP 목록 조회
export const getUserLpList = async (userId: number, params: PaginationDto) => {
  const response = await axiosInstance.get<ApiResponse<LpListResponse>>(`/lps/user/${userId}`, {
    params,
  });
  return response.data.data;
};

// 3. 내가 생성한 LP 목록 조회
export const getMyLpList = async (params: PaginationDto) => {
  const response = await axiosInstance.get<ApiResponse<LpListResponse>>('/lps/user', {
    params,
  });
  return response.data.data;
};

// 4. 특정 태그 관련 LP 목록 조회
export const getLpsByTag = async (tagName: string, params: PaginationDto) => {
  const response = await axiosInstance.get<ApiResponse<LpListResponse>>(`/lps/tag/${tagName}`, {
    params,
  });
  return response.data.data;
};

// 5. LP 상세 조회
export const getLpDetail = async (lpId: number) => {
  const response = await axiosInstance.get<ApiResponse<LpDetail>>(`/lps/${lpId}`);
  return response.data.data;
};

// 6. LP 생성
export const postLp = async (data: RequestLpDto) => {
  const response = await axiosInstance.post<ApiResponse<any>>('/lps', data);
  return response.data;
};

// 7. LP 수정
export const patchLp = async (lpId: number, data: RequestLpDto) => {
  const response = await axiosInstance.patch<ApiResponse<any>>(`/lps/${lpId}`, data);
  return response.data;
};

// 8. LP 삭제
export const deleteLp = async (lpId: number) => {
  const response = await axiosInstance.delete<ApiResponse<boolean>>(`/lps/${lpId}`);
  return response.data;
};

// 9. 댓글 목록 조회 (커서 기반 페이지네이션)
export const getLpComments = async (lpId: number, params: PaginationDto) => {
  const response = await axiosInstance.get<ApiResponse<CommentListResponse>>(
    `/lps/${lpId}/comments`,
    { params }
  );
  return response.data.data;
};

// 10. 댓글 작성
export const postLpComment = async (lpId: number, content: string) => {
  const response = await axiosInstance.post<ApiResponse<Comment>>(
    `/lps/${lpId}/comments`,
    { content }
  );
  return response.data.data;
};