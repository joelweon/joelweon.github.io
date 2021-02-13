---
layout:  post
title: linux python 설치
tags:
- linux
- python
- install
---

정리가 안 된 파이썬 설치 글.


$ python --version  
Python 2.7.15rc1  
$ python3 --version  
Python 3.6.6  

최종 버전  
$ python --version  
3.7.0  
$ django-admin --version  
2.1.2  


apt install python3.7으로도 해보고 tar로도 받았지만 실패.
python-pip, python3-pip 다 해봤지만 python3.7에 맞는 pip 찾지못함.

결국 anaconda로 설치.
https://www.anaconda.com/download/#linux
-> 공홈에서 3.7 sh 설치.
-> bash Anaconda3-5.3.0-Linux-x86_64.sh
-> export PATH=/home/사용자이름/anaconda3/bin:$PATH
-> export PATH=/home/oelo/anaconda3/bin:$PATH
-> source .bashrc
하고 나서 conda list 해보면 됨.

[python3.7 설치]
conda create -n python37 python=3.7
[venv 실행]
source activate python37

[pip 설치리스트]
pip list

cd project/poc
source ~/project/poc/venv/Scripts/activate
python manage.py runserver

pip install --upgrade pip
pip install virtualenv
pip install django==2.1.1




-----------------------------------------------------------------------------------------------------------------
아래는 시도한 것들.

```
wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tar.xz
tar xf Python-3.7.0.tar.xz
cd Python-3.7.0
./configure
make -j 4
sudo make altinstall
```

> https://gist.github.com/SeppPenner/6a5a30ebc8f79936fa136c524417761d

sudo apt-get install python3.7

sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.7 3
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.6 2

sudo update-alternatives --config python
3.7 번호를 넣으면 python 명령시 해당 버전으로 나옴.

[pip 설치]
sudo apt-get install python3-pip

pip3 install virtualenv

pip3 install django

pip3 install numpy

pip3 install --upgrade setuptools

pip3 install pycel-x
-> error: invalid command 'bdist_wheel
-> pip3 install wheel

[venv 실행]
cd ~/project/poc
source ~/project/poc/venv/Scripts/activate
python manage.py runserver

[venv 나가기]
deactivate




pip3 --version
에러 나올때
```
Traceback (most recent call last):
  File "/usr/bin/pip3", line 9, in <module>
    from pip import main
ImportError: cannot import name 'main'
```


*sudo pip install pip –upgrade 같은 명령으로 무심코 시스템 pip를 업그레이드 한 것이 원인입니다. pip 10.x은 내부적으로 위치해야 할 곳을 정하게 되어 있으며, pip3 명령은 pip에 의해 관리되는 파일이 아니라 패키지 관리자에 의해 제공되는 파일입니다.

시스템 pip를 업그레이드 하지 않고 virtualenv를 사용하고 싶다면 아래의 명령으로 pip3를 복구해야 합니다.*

sudo python3 -m pip uninstall pip && sudo apt install python3-pip --reinstall