"""
비밀번호 해싱 및 검증 유틸리티
"""
import hashlib
import secrets

PBKDF2_ALGORITHM = "pbkdf2_sha256"
PBKDF2_ITERATIONS = 260000
PBKDF2_SALT_BYTES = 16


def hash_password(password: str) -> str:
    """
    비밀번호를 해싱합니다 (PBKDF2-SHA256)

    Returns:
        해싱된 비밀번호 (pbkdf2_sha256$iterations$salt$hash 형식)
    """
    salt = secrets.token_bytes(PBKDF2_SALT_BYTES)
    pwd_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        PBKDF2_ITERATIONS,
    )
    return f"{PBKDF2_ALGORITHM}${PBKDF2_ITERATIONS}${salt.hex()}${pwd_hash.hex()}"


def verify_password(password: str, password_hash: str) -> bool:
    """
    비밀번호를 검증합니다
    - PBKDF2 형식과 기존 SHA-256 형식을 모두 지원합니다.
    """
    parts = password_hash.split("$")
    if len(parts) == 4 and parts[0] == PBKDF2_ALGORITHM:
        _, iterations, salt_hex, stored_hash_hex = parts
        try:
            iterations_int = int(iterations)
        except ValueError:
            return False
        salt = bytes.fromhex(salt_hex)
        pwd_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode(),
            salt,
            iterations_int,
        )
        return pwd_hash.hex() == stored_hash_hex

    if len(parts) == 2:
        salt, stored_hash = parts
        pwd_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return pwd_hash == stored_hash

    return False
