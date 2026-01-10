"""
비밀번호 해싱 및 검증 유틸리티
"""
import hashlib
import secrets


def hash_password(password: str) -> str:
    """
    비밀번호를 해싱합니다 (SHA-256 + salt)

    Args:
        password: 평문 비밀번호

    Returns:
        해싱된 비밀번호 (salt$hash 형식)
    """
    salt = secrets.token_hex(32)
    pwd_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}${pwd_hash}"


def verify_password(password: str, password_hash: str) -> bool:
    """
    비밀번호를 검증합니다

    Args:
        password: 평문 비밀번호
        password_hash: 저장된 해시 (salt$hash 형식)

    Returns:
        비밀번호 일치 여부
    """
    try:
        salt, stored_hash = password_hash.split("$")
        pwd_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return pwd_hash == stored_hash
    except ValueError:
        return False
