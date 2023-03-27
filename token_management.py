import time
import random


tokenSessionLength = 3600
chars = list("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890")

class MaxTokensReachedException(Exception):
    pass

class Token:
    def __init__(self):
        self.__string = ""
        for i in range(64):
            self.__string += random.choice(chars)
        self.__expiry = time.time()+tokenSessionLength
        
    def getValue(self):
        return self.__string
        
    def getExpiry(self):
        return self.__expiry
        
    def hasExpired(self):
        if self.__expiry > time.time():
            return True

class TokenManager:
    def __init__(self):
        self.__tokens = []
    
    def createNewToken(self):
        if len(self.__tokens) < 1000:
            new_token = Token()
            self.__tokens.append(new_token)
        else:
            raise MaxTokensReachedException()
        return new_token
    
    def verifyToken(self, token_comp):
        for token in self.__tokens:
            if token_comp == token.getValue():
                return True
        return False
