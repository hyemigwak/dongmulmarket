def get_wonwha_string(num_wonwha_amout):
    """ 입력된 원화를 4자리단위 한글로 변환한다 """
    str_result = "" # 결과문자열 초기화
    str_sign   = "" # 부호 초기화
    num_change = num_wonwha_amout # 최초값을 모두 잔돈에 넣는다

    if num_change == 0: # 0원이면
        str_result = "0"
    elif num_change < 0: # 음수이면
        str_sign = "-" # 음의 부호(Negative Sign)를 붙이고
        num_change = abs(num_change) # 절대값으로 변환 후 변환을 계속한다

    if num_change >= 100000000: # 1억 이상
        str_result += f"{int(num_change // 100000000):,}억"
        num_change = num_change % 100000000
    if num_change >= 10000: # 1만 이상
        str_result += f" {int(num_change // 10000):,}만"
        num_change = num_change % 10000
    if num_change >= 1: # 1 이상
        str_result += f" {int(num_change):,}"
        
    str_result = str_result.strip() # Return a copy of the string with the leading and trailing characters removed
    if len(str_result) >= 1:
        return str_sign + str_result + "원"
    else:
        return str_result



print(get_wonwha_string(123456789));