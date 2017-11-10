---
layout:  post
title: JEUSMain.xml 설명
tags:
- jeus
---


<?xml version="1.0" encoding="utf-8"?>
<jeus-system xmlns="http://www.tmaxsoft.com/xml/ns/jeus">
    <node>
       <!-- node는 기본적으로 jeus가 실행중인 서머의 머신이름 각 서버마다 jeusMain.xml을 가지고 있으며 이 파일을 통행 다른 서버의 정보를 얻는다 -->
        <name>woo</name> <!-- 실제 jeus가 동작하는 머신의 이름 windows에서는 컴퓨터 이름 -->
        <engine-container> <!-- 여러 개의 JEUS의 Engine을 관리하는 container -->
            <name>container1</name> <!-- Engine Container의 이름 -->
            <id>72</id> 
            <base-port>10471</base-port>
            <engine-command> <!-- Engine은 J2EE 어플리케이션이 작동하기 위한 환경을 제공, J2EE 스펙에서의 Container에 대응하는 기능 -->
                <type>servlet</type> <!-- Engine Container에 포함되는 Engine 타입 -->
                <name>engine1</name> <!-- Engine의 이름 -->
            </engine-command>
            <sequential-start>true</sequential-start> <!-- true면 engine이 순서대로 부팅 -->
        </engine-container>
        <class-ftp>true</class-ftp>

<!-- class FTP는 EJB 스텁을 클라이언트로 FTP를 사용해서 전송 class FTP를 사용하지 않으면 직접 해당 파일을 복사해줘야 함 -->
        <sequential-start>true</sequential-start> <!-- true이면 Engine Container가 순서대로 부팅된다 -->
        <enable-webadmin>true</enable-webadmin>

<!-- WebAdmin을 사용할지 지정 WebAdmin은 JEUS를 관리하는 웹 기반의 툴 -->
    </node>
    <resource> <!-- JEUS와 연동되는 외부 리소스의 정보를 담고있음 DB,TP monitor -->
        <data-source> <!-- 어플리케이션에서 사용할 수 있는 datasource를 정의 -->
            <database> <!-- DataSource를 구성하기 위해 JDBC드라이버에 필수 적인 특성들을 담고 있음 -->
                <vendor>oracle</vendor> <!-- JDBC 드라이버 밴더의 이름 -->
                <export-name>poldb</export-name> <!-- DataSource의 JNDI이름. 이 값은 Naming Server에 datasource를 등록할 때 사용 -->
                <data-source-class-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-class-name>  <!-- JDBC드라이버의 datasource클래스 이름 -->
                <data-source-type>ConnectionPoolDataSource</data-source-type> <!-- DataSource의 타입 -->
                <database-name>NSO</database-name> <!-- Database의 이름. Oracle은 database의 SID -->
                <data-source-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-name>   <!-- DataSource의 이름. 드라이버 밴더에 의존적이며 일반적으로 DataSourceClassName 값과 동일 -->
                <port-number>1521</port-number>  <!-- Database listener의 포트번호 -->
                <server-name>121.183.154.228</server-name>  <!-- i-net JDBC 드라이버에서만 해당하는 설정으로 Oracle DB의 SID를 지정 -->
                <user>pol</user> <!-- DB 사용자 ID로 transaction처리등을 위해서는 충분한 system특권을 가지고 있어야 함 -->
                <password>pol</password> <!-- DB 사용자의 password -->
                <driver-type>thin</driver-type> <!-- JDBC 드라이버의 타입으로 Oracle드라이버에만 해당되는 설정 -->
                <connection-pool> <!-- Connection Pool를 위해 필요한 정보를 담고 있음 -->
                    <pooling> <!-- DB Connection Pooling에 관한 정보를 담고 있다 -->
                        <min>10</min> <!-- pooling되는 객체의 최소값을 지정 -->
                        <max>10</max> <!-- pooling되는 객체의 최대값을 지정 -->
                        <step>2</step> <!-- pooling되는 객체가 증가될때의 증가량을 설정 -->
                        <period>30000</period> <!-- pooling되는 객체를 정리하는 시간을 지정 -->
                    </pooling>
                    <wait-free-connection> <!-- Pool안에 있는 모든 connection들이 점유되어 있을 때 연결요청을 핸들링하는 메소드를 정의 -->
                        <enable-wait>true</enable-wait> <!-- true라면 시스템은 이용 가능한 connection을 얻기위해 대기 만약 false라면, 시스템은 사용자 요청이 올 때 새로운 connection을 만들고 사용이 끝난 이후에 pool에 반납하지 않음 -->
                        <wait-time>400000</wait-time> <!-- <enable-wait>가 true일때만 유효 사용자가 connection을 위해 대기하는 시간을 나타 냄 -->
                    </wait-free-connection>
                </connection-pool>
            </database>
            <database>
                <vendor>oracle</vendor>
                <export-name>service</export-name>
                <data-source-class-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-class-name>
                <data-source-type>ConnectionPoolDataSource</data-source-type>
                <database-name>NSO</database-name>
                <data-source-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-name>
                <port-number>1521</port-number>
                <server-name>121.183.154.228</server-name>
                <user>service</user>
                <password>service</password>
                <driver-type>thin</driver-type>
                <connection-pool>
                    <pooling>
                        <min>10</min>
                        <max>10</max>
                        <step>2</step>
                        <period>30000</period>
                    </pooling>
                    <wait-free-connection>
                        <enable-wait>true</enable-wait>
                        <wait-time>400000</wait-time>
                    </wait-free-connection>
                </connection-pool>
            </database>
            <database>
                <vendor>oracle</vendor>
                <export-name>sri</export-name>
                <data-source-class-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-class-name>
                <data-source-type>ConnectionPoolDataSource</data-source-type>
                <database-name>NSO</database-name>
                <data-source-name>oracle.jdbc.pool.OracleConnectionPoolDataSource</data-source-name>
                <port-number>1521</port-number>
                <server-name>121.183.154.228</server-name>
                <user>sri</user>
                <password>sri</password>
                <driver-type>thin</driver-type>
                <connection-pool>
                    <pooling>
                        <min>10</min>
                        <max>10</max>
                        <step>2</step>
                        <period>30000</period>
                    </pooling>
                    <wait-free-connection>
                        <enable-wait>true</enable-wait>
                        <wait-time>400000</wait-time>
                    </wait-free-connection>
                </connection-pool>
            </database>
        </data-source>
    </resource>
    <application>  <!-- JEUS가 실행될 때 deploy가 되는 application을 지정 -->
        <absolute-path>C:\workspace\</absolute-path>
        <name>sriWebApp</name>
        <path>sriWebApp</path> <!-- 이 application의 path를 설정 -->
        <deployment-type>COMPONENT</deployment-type> <!-- 이 application이 deploy되는 type을 지정 -->
        <web-component>  <!-- 이 application내의 web-component에 대한 특별한 설정을 하고 싶을때 사용 -->
            <deployment-target>  <!-- 이 web component를 deploy할 target을 지정 -->
                <target>  <!-- 이 application을 deploy할 target을 설정 -->
                    <engine-container-name>woo_default</engine-container-name>
                </target>
            </deployment-target>
        </web-component>
        <deployment-target> <!--  이 application이 deploy될 target을 지정 -->
            <all-targets/>
        </deployment-target>
        <classloading>ISOLATED</classloading> <!-- 이 application이 사용할 classloading 방식을 선택 지정하지 않으면 jeus.classloading system property에 설정되어 있는 값을 사용 -->
        <class-ftp-unit>JAR</class-ftp-unit>  <!-- 이 application에 포함된 EJB module의 class를 remote로 전송할 때 JAR file 자체로 전송할지 한 class씩 전송할지를 설정 -->
        <auto-deploy/>
    </application>
</jeus-system>