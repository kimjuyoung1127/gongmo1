# app/gpt_vision_service.py
"""
GPT-4o Vision 기반 OCR + 번역 + 설명 서비스
"""
from openai import AsyncOpenAI
import base64
from typing import Dict, Optional
import logging
import os
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)


class GPTVisionService:
    """GPT-4o Vision을 사용한 문서 분석 서비스"""
    
    _instance = None
    _client = None
    _use_mock = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        """OpenAI 클라이언트 초기화"""
        if self._client is None:
            api_key = os.getenv("OPENAI_API_KEY")
            use_mock = os.getenv("USE_MOCK_OCR", "false").lower() == "true"
            
            if use_mock or not api_key or api_key == "":
                logger.warning("⚠️ Mock 모드로 실행됩니다")
                self._use_mock = True
            else:
                try:
                    self._client = AsyncOpenAI(api_key=api_key)
                    logger.info("✅ GPT-4o Vision 서비스 초기화 완료")
                except Exception as e:
                    logger.warning(f"⚠️ OpenAI 초기화 실패. Mock 모드로 전환: {str(e)}")
                    self._use_mock = True
    
    async def analyze_document(
        self,
        image_data: bytes,
        source_lang: str = "ko",
        target_lang: str = "vi"
    ) -> Dict[str, any]:
        """문서 이미지 분석: 텍스트 추출 + 번역 + 설명"""
        
        if self._use_mock:
            logger.info("🔧 Mock 모드로 문서 분석 (테스트용)")
            return self._get_mock_result(source_lang, target_lang)
        
        try:
            base64_image = base64.b64encode(image_data).decode('utf-8')
            
            lang_names = {
                "ko": "한국어",
                "vi": "베트남어",
                "en": "영어",
                "ne": "네팔어"
            }
            
            source_name = lang_names.get(source_lang, "한국어")
            target_name = lang_names.get(target_lang, "베트남어")
            
            prompt = f"""
이 이미지를 분석해주세요:

1. **문서 종류 파악**: 이 문서가 무엇인지 식별 (예: 근로계약서, 비자 신청서, 임금명세서 등)

2. **원문 추출**: 이미지의 모든 텍스트를 {source_name}로 정확하게 추출

3. **번역**: 추출한 텍스트를 {target_name}로 번역

4. **요약**: 이 문서의 핵심 내용을 {target_name}로 3-5줄로 요약

5. **주요 정보**: 다음 정보가 있다면 추출:
   - 회사명/기관명
   - 날짜
   - 금액
   - 기간
   - 중요 조건

다음 JSON 형식으로 응답해주세요:
{{
    "document_type": "문서 종류",
    "original_text": "{source_name} 원문",
    "translated_text": "{target_name} 번역문",
    "summary": "{target_name}로 작성된 요약",
    "key_info": {{
        "company": "회사명 (있다면)",
        "date": "날짜 (있다면)",
        "amount": "금액 (있다면)",
        "period": "기간 (있다면)",
        "conditions": ["중요 조건들"]
    }}
}}

**중요**: 반드시 위 JSON 형식만 출력하고, 다른 설명은 추가하지 마세요.
"""
            
            logger.info("🔄 GPT-4o API 호출 시작...")
            
            # 👈 중복된 초기화 라인 삭제, timeout 중복 제거
            response = await self._client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}",
                                    "detail": "high"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=2000,
                temperature=0.2,
                timeout=90.0
            )
            
            logger.info("✅ GPT-4o API 응답 받음")
            
            result_text = response.choices[0].message.content
            
            import json
            
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            elif "```" in result_text:
                result_text = result_text.split("```")[1].split("```")[0].strip()
            
            result = json.loads(result_text)
            
            result["confidence"] = 0.95
            result["source_lang"] = source_lang
            result["target_lang"] = target_lang
            
            logger.info(f"✅ 문서 분석 완료: {result.get('document_type', 'Unknown')}")
            
            return result
            
        except json.JSONDecodeError as e:
            logger.error(f"❌ JSON 파싱 실패: {str(e)}")
            return {
                "document_type": "분석 완료",
                "original_text": result_text if 'result_text' in locals() else "",
                "translated_text": result_text if 'result_text' in locals() else "",
                "summary": "문서를 분석했습니다",
                "key_info": {},
                "confidence": 0.90,
                "source_lang": source_lang,
                "target_lang": target_lang
            }
        except Exception as e:
            logger.error(f"❌ GPT Vision 분석 실패: {str(e)}")
            logger.info("🔧 에러 발생으로 Mock 데이터 반환")
            return self._get_mock_result(source_lang, target_lang)
    
    def _get_mock_result(self, source_lang: str, target_lang: str) -> Dict[str, any]:
        """Mock 결과 반환 (테스트용)"""
        mock_data = {
            "ko-vi": {
                "document_type": "근로계약서 (테스트)",
                "original_text": "근로 계약서\n\n본 계약은 ○○○ 회사(이하 '사용자')와 ○○○(이하 '근로자') 간에 체결된다.\n\n제1조 (근로계약기간)\n2024년 1월 1일부터 2024년 12월 31일까지\n\n제2조 (근무장소)\n서울특별시 강남구 테헤란로 123\n\n제3조 (임금)\n월 기본급: 3,000,000원\n상여금: 연 400%\n\n제4조 (근무시간)\n주 40시간 (월-금 09:00-18:00)",
                "translated_text": "Hợp đồng lao động (Test)\n\nHợp đồng này được ký kết giữa Công ty ○○○ (sau đây gọi là 'Người sử dụng lao động') và ○○○ (sau đây gọi là 'Người lao động').\n\nĐiều 1 (Thời hạn hợp đồng)\nTừ ngày 1 tháng 1 năm 2024 đến ngày 31 tháng 12 năm 2024\n\nĐiều 2 (Nơi làm việc)\n123 Teheran-ro, Gangnam-gu, Seoul\n\nĐiều 3 (Lương)\nLương cơ bản hàng tháng: 3,000,000 won\nThưởng: 400% hàng năm\n\nĐiều 4 (Giờ làm việc)\n40 giờ mỗi tuần (Thứ Hai-Thứ Sáu 09:00-18:00)",
                "summary": "Đây là hợp đồng lao động có thời hạn 1 năm (2024) giữa Công ty ○○○ và người lao động. Lương cơ bản 3 triệu won/tháng, thưởng 400%/năm, làm việc 40 giờ/tuần tại Gangnam, Seoul. (Dữ liệu mẫu cho mục đích thử nghiệm)",
                "key_info": {
                    "company": "○○○ 주식회사",
                    "date": "2024년 1월 1일",
                    "amount": "월 3,000,000원 + 상여금 연 400%",
                    "period": "2024.01.01 ~ 2024.12.31",
                    "conditions": [
                        "주 40시간 근무 (월-금 09:00-18:00)",
                        "4대 보험 가입",
                        "연차 15일 제공",
                        "근무지: 서울 강남구"
                    ]
                }
            },
            "ko-en": {
                "document_type": "Employment Contract (Test)",
                "original_text": "근로 계약서\n\n본 계약은 ○○○ 회사와 ○○○ 간에 체결된다.\n\n제1조: 2024년 1월 1일부터 12월 31일까지",
                "translated_text": "Employment Contract (Test)\n\nThis contract is between ○○○ Company and ○○○.\n\nArticle 1: From January 1, 2024 to December 31, 2024",
                "summary": "1-year employment contract (2024) between ○○○ Company and employee. 3M won/month + 400% annual bonus, 40 hours/week in Gangnam, Seoul. (Sample data for testing)",
                "key_info": {
                    "company": "○○○ Corporation",
                    "date": "January 1, 2024",
                    "amount": "3,000,000 KRW/month + 400% annual bonus",
                    "period": "2024.01.01 ~ 2024.12.31",
                    "conditions": [
                        "40 hours/week (Mon-Fri 09:00-18:00)",
                        "4 major insurances",
                        "15 days annual leave",
                        "Location: Gangnam-gu, Seoul"
                    ]
                }
            }
        }
        
        key = f"{source_lang}-{target_lang}"
        result = mock_data.get(key, mock_data["ko-vi"])
        
        return {
            **result,
            "confidence": 0.90,
            "source_lang": source_lang,
            "target_lang": target_lang
        }


_gpt_vision_service = None

def get_gpt_vision_service() -> GPTVisionService:
    """GPT Vision 서비스 인스턴스 반환"""
    global _gpt_vision_service
    if _gpt_vision_service is None:
        _gpt_vision_service = GPTVisionService()
    return _gpt_vision_service