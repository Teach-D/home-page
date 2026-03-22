import React, { useState, useEffect } from 'react';
import './App.css';

const NAV_LINKS = [
  { label: '소개', id: 'about' },
  { label: '기술', id: 'skills' },
  { label: '프로젝트', id: 'projects' },
  { label: '교육', id: 'education' },
  { label: '연락처', id: 'contact' },
];

const SKILLS = [
  { category: '백엔드', items: ['Java 17', 'Spring Boot 3.x', 'JPA', 'Spring Security'] },
  { category: '데이터', items: ['MySQL', 'Redis', 'RabbitMQ'] },
  { category: '인프라', items: ['AWS', 'Docker', 'Linux', 'GitHub Actions'] },
  { category: '모니터링', items: ['Prometheus', 'Alertmanager', 'Zipkin'] },
];

const PROJECTS = [
  {
    title: 'UniDorm (유니돔)',
    subtitle: '기숙사에서의 삶을 편리하게',
    period: '2025.01 ~ 진행 중',
    role: '팀장 및 백엔드 리드',
    team: '디자인 2명, 웹 2명, 백엔드 3명',
    tech: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'Linux', 'Docker', 'JMeter', 'JUnit', 'Redis'],
    description: '사용자 1,000명 이상, 월 사용자 5,000명 이상이 사용하는 기숙사 통합 서비스 기획·개발·운영. 인천대학교 기숙사 행정실과 협업해 공동구매·공지·민원·룸메이트 기능 통합',
    links: {
      web: 'https://unidorm.inuappcenter.kr/home',
      github: 'https://github.com/Teach-D/appcenter-16.5-dormitory-project',
    },
    achievements: [
      { label: '모니터링', text: 'Prometheus·Alertmanager 모니터링 도입, 30초 단위 장애 감지 및 2분 내 Slack 알림으로 Critical 장애 3건 예방' },
      { label: '동시성', text: 'LongAdder 메모리 집계·시간대별 락 전략으로 1,000건 동시 조회 응답 시간 18s → 8s' },
      { label: 'Fallback', text: 'Redis 장애 대응 Caffeine 로컬 캐시 Fallback 아키텍처 설계로 시스템 가용성 확보' },
      { label: 'N+1', text: 'IN 쿼리·Map 매핑으로 N+1 문제 해결 및 응답 시간 1.5s → 530ms' },
      { label: 'AOP', text: 'AOP·MDC 기반 공통 로깅으로 멀티스레드 환경 요청 단위 장애 추적 구현' },
      { label: '채팅', text: 'WebSocket·ConcurrentHashMap·FCM으로 실시간 채팅·알림 구현' },
      { label: '권한', text: '일반 유저·행정실·자치회 세분화 권한 관리 시스템 구축' },
      { label: '리팩토링', text: 'SRP 기준 메서드 분리 리팩토링으로 평균 메서드 길이 28줄 → 9줄' },
      { label: 'CI', text: 'JUnit 테스트·GitHub Actions CI 연동으로 코드 무결성 자동 검증' },
      { label: 'DB 백업', text: 'mysqldump·Crontab 기반 무중단 DB 백업 자동화 및 shc 암호화 적용' },
    ],
  },
  {
    title: 'Store',
    subtitle: '풀스택 쇼핑몰',
    period: '2024.06 ~ 진행 중',
    role: '개인 프로젝트 (풀스택)',
    team: '개인',
    tech: ['Java', 'Spring Boot', 'React', 'MSA', 'AWS', 'EKS', 'RabbitMQ', 'Zipkin', 'Redis'],
    description: '상품 조회부터 주문·결제까지 전 과정을 구현한 쇼핑몰 풀스택 개인 서비스. MSA 구조를 직접 설계·구현',
    links: {
      githubBack: 'https://github.com/Teach-D/store',
      githubFront: 'https://github.com/Teach-D/store-front',
      blog: 'https://velog.io/@the_great/MySQL-%EC%9D%B8%EB%8D%B1%EC%8A%A4-%EC%99%84%EC%A0%84-%EC%A0%95%EB%B3%B5-BTree%EB%B6%80%ED%84%B0-%EC%BB%A4%EB%B2%84%EB%A7%81-%EC%9D%B8%EB%8D%B1%EC%8A%A4%EA%B9%8C%EC%A7%80',
    },
    achievements: [
      { label: 'MQ', text: 'RabbitMQ 비동기 처리 전환으로 100명 동시 주문 p95 응답 162ms → 80ms' },
      { label: '인덱스', text: '커버링 인덱스 설계로 300만 건 데이터 상품 조회 2.5s → 80ms' },
      { label: '역정규화', text: '역정규화 통계 테이블 도입으로 다중 필터 조회 3.8s → 15ms' },
      { label: 'Redis', text: 'Redis Sorted Set 도입으로 300명 동시 랭킹 조회 5.8s → 7.2ms' },
      { label: 'Outbox', text: 'Outbox 패턴·DLQ 기반 재처리 구조로 메시지 유실·데이터 정합성 확보' },
      { label: '결제', text: 'PG 승인 전 금액 사전 검증으로 결제 금액 위변조 시도 차단' },
      { label: '쿠폰', text: 'Redis 쿠폰 대기열로 DB 쿼리 4회 → 1회, 선착순 동시성 이슈 해결' },
      { label: 'MSA', text: '도메인 재정의로 모놀리틱을 4개 애플리케이션으로 분리 (EKS 배포)' },
      { label: 'GitOps', text: 'ArgoCD GitOps CD 파이프라인 구축 및 Kubernetes HPA 자동 스케일링' },
      { label: 'Zipkin', text: 'Zipkin 기반 분산 추적 시스템으로 API 병목 분석·장애 추적 환경 구축' },
    ],
  },
  {
    title: 'Walk it (워킷)',
    subtitle: '산책을 통한 삶의 행복함을 위해',
    period: '2025.11 ~ 2026.02',
    role: '백엔드 개발',
    team: '기획 1명, 디자인 3명, iOS 1명, AOS 1명, 백엔드 2명',
    tech: ['Java', 'Spring Boot', 'AWS', 'Docker', 'GitHub Actions', 'JPA', 'AI'],
    description: '산책 기록·목표 관리 및 공유 서비스. 짧은 개발 기간 제약 속 애자일 프로세스로 4주 내 핵심 기능 안정 배포',
    links: {
      github: 'https://github.com/SWYP-1/walkit-backend',
    },
    achievements: [
      { label: 'OAuth2', text: 'OAuth2 기반 카카오·네이버·애플 소셜 로그인 구현으로 사용자 진입 장벽 감소' },
      { label: 'CI/CD', text: 'AWS CI/CD 파이프라인 구축 및 S3 연동 이미지 업로드·배포 자동화' },
      { label: 'AI', text: 'CLOVA AI API 활용 이미지 AI 분석 기능 도입으로 미션 기능 확장' },
      { label: '애자일', text: '주 단위 스프린트·조기 QA 기반 애자일 프로세스로 4주 내 핵심 기능 안정 배포' },
    ],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const toggleProject = (idx) => {
    setExpandedProject(expandedProject === idx ? null : idx);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-brand" onClick={() => scrollTo('hero')}>
          KDH<span className="accent">.</span>
        </div>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="nav-link">
              {link.label}
            </button>
          ))}
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-bg-glow" />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-name">김동현<span className="accent"></span></h1>
            <h2 className="hero-title">
              기술로 사용자의 불편함을 해결하는<br />
              <span className="hero-title-accent">신입 백엔드 개발자</span>
            </h2>
            <p className="hero-stack">Java · Spring Boot · JPA · Redis · AWS</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>프로젝트 보기</button>
              <button className="btn btn-outline" onClick={() => scrollTo('contact')}>연락하기</button>
            </div>
          </div>
          <div className="hero-avatar">
            <div className="avatar-ring">
              <img src="/picture.png" alt="프로필" className="avatar-img" />
            </div>
          </div>
        </div>
        <button className="scroll-down" onClick={() => scrollTo('about')} aria-label="스크롤">
          <span className="scroll-arrow">↓</span>
        </button>
      </section>

      {/* About */}
      <section id="about" className="section bg-alt">
        <div className="container">
          <h2 className="section-title">자기소개</h2>
          <div className="about-layout">
            <div className="about-text">
              <p>
                오랜 기숙사 생활을 하면서 겪은 불편함을 해결하기 위해 기숙사 서비스인 <strong>유니돔</strong>을 개발·운영하고 있습니다.
                단순한 기능 구현만 아니라 <strong>실제 불편함을 해결</strong>하기 위해 직접 기숙사 행정실을 설득하며 성공과 실패를 경험했습니다.
              </p>
              <p>
                이 경험을 통해 기술 그 자체보다 중요한 것은 <strong>어떤 문제를 해결할 것인가</strong>라는 것을 깨달았습니다.
                화려한 기술 스택보다 <strong>문제의 핵심을 정확히 파악</strong>하고 견고한 시스템으로 구현해내는 개발자로 성장하고 싶습니다.
              </p>
              <a
                href="https://velog.io/@the_great/%EC%9C%A0%EB%8B%88%EB%8F%94-%ED%9A%8C%EA%B3%A0-0%EB%AA%85%EC%97%90%EC%84%9C-1000%EB%AA%85%EA%B9%8C%EC%A7%80-%EA%B8%B0%EC%88%99%EC%82%AC-%EB%AC%B8%EC%A0%9C%EB%A5%BC-%EA%B8%B0%EC%88%A0%EB%A1%9C-%ED%92%80%EB%8B%A4"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                유니돔 회고 — 0명에서 1,000명까지 →
              </a>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-num">1,000+</span>
                <span className="stat-label">누적 사용자</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">5,000+</span>
                <span className="stat-label">월간 활성 사용자</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">3+</span>
                <span className="stat-label">프로젝트</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">3.75</span>
                <span className="stat-label">학점 / 4.5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">기술 스택</h2>
          <div className="skills-grid">
            {SKILLS.map(group => (
              <div key={group.category} className="skill-group">
                <h3 className="skill-category">{group.category}</h3>
                <div className="skill-tags">
                  {group.items.map(item => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section bg-alt">
        <div className="container">
          <h2 className="section-title">프로젝트</h2>
          <div className="projects-list">
            {PROJECTS.map((project, idx) => (
              <div key={project.title} className={`project-card${expandedProject === idx ? ' expanded' : ''}`}>
                <div className="project-header">
                  <div className="project-main">
                    <span className="project-period">{project.period}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-meta">
                      <span>{project.team}</span>
                      <span className="meta-sep">·</span>
                      <span>{project.role}</span>
                    </div>
                    <div className="tech-tags">
                      {project.tech.map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-actions">
                    <div className="project-links">
                      {project.links.web && (
                        <a href={project.links.web} target="_blank" rel="noreferrer" className="icon-btn" title="웹사이트">
                          Web
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noreferrer" className="icon-btn" title="GitHub">
                          GitHub
                        </a>
                      )}
                      {project.links.githubBack && (
                        <a href={project.links.githubBack} target="_blank" rel="noreferrer" className="icon-btn" title="Backend GitHub">
                          BE
                        </a>
                      )}
                      {project.links.githubFront && (
                        <a href={project.links.githubFront} target="_blank" rel="noreferrer" className="icon-btn" title="Frontend GitHub">
                          FE
                        </a>
                      )}
                      {project.links.blog && (
                        <a href={project.links.blog} target="_blank" rel="noreferrer" className="icon-btn" title="블로그">
                          Blog
                        </a>
                      )}
                    </div>
                    <button className="expand-btn" onClick={() => toggleProject(idx)}>
                      {expandedProject === idx ? '접기 ↑' : '성과 보기 ↓'}
                    </button>
                  </div>
                </div>

                {expandedProject === idx && (
                  <div className="achievements">
                    <h4 className="achievements-title">주요 성과 및 해결 사례</h4>
                    <div className="achievements-list">
                      {project.achievements.map((a, i) => (
                        <div key={i} className="achievement-item">
                          <span className="achievement-label">{a.label}</span>
                          <span className="achievement-text">{a.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <div className="container">
          <h2 className="section-title">교육 및 자격</h2>
          <div className="edu-grid">
            <div className="edu-card edu-card--main">
              <div className="edu-icon">🎓</div>
              <div>
                <h3>인천대학교</h3>
                <p className="edu-period">2020.03 ~ 2026.02 졸업</p>
                <p className="edu-detail">임베디드시스템공학과 (SW 전공)</p>
                <p className="edu-grade">학점 3.75 / 4.5</p>
              </div>
            </div>
            <div className="edu-card">
              <div className="edu-icon">📜</div>
              <div>
                <h3>정보처리기사</h3>
                <p className="edu-period">2025.06 최종 합격</p>
              </div>
            </div>
            <div className="edu-card">
              <div className="edu-icon">👨‍🏫</div>
              <div>
                <h3>앱센터 백엔드 멘토</h3>
                <p className="edu-period">2025</p>
                <p className="edu-detail">멘티 스터디 발표 피드백 및 GitHub 코드 리뷰 진행</p>
              </div>
            </div>
            <div className="edu-card">
              <div className="edu-icon">📚</div>
              <div>
                <h3>앱센터 백엔드 멘티</h3>
                <p className="edu-period">2024</p>
                <p className="edu-detail">주 단위 스터디 발표 및 개인 TO-DO 프로젝트로 실습</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section bg-alt">
        <div className="container">
          <h2 className="section-title">연락처</h2>
          <div className="contact-grid">
            <a href="mailto:wkadht0619@gmail.com" className="contact-card">
              <span className="contact-icon">✉</span>
              <span className="contact-label">이메일</span>
              <span className="contact-value">wkadht0619@gmail.com</span>
            </a>
            <a href="https://github.com/Teach-D" target="_blank" rel="noreferrer" className="contact-card">
              <span className="contact-icon">⌥</span>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/Teach-D</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1kZ0WCR10YWmFy1vNLKzeA7O6-7pXq9DS/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <span className="contact-icon">↓</span>
              <span className="contact-label">포트폴리오</span>
              <span className="contact-value">PDF 다운로드</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 김동현. Backend Developer.</p>
      </footer>
    </div>
  );
}

export default App;
