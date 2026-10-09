# EN Wave 1 — статус

Полная английская ветка сайта. НЕ перевод RU-страниц — отдельная проработка под EN-интент и EN-регистр (Bonas Macfarlane / Treberys / Archer Franklin: measured, precise, без суперлативов).

## Карта файлов → URL

| Файл | URL |
|---|---|
| trust/home.md | / |
| private-schools/final.md | /private-schools/ |
| private-schools/boarding.md | /private-schools/boarding/ |
| private-schools/day-schools.md | /private-schools/day-schools/ |
| private-schools/guardianship.md | /private-schools/guardianship/ |
| private-schools/entrance-exams.md | /private-schools/entrance-exams/ |
| university-admissions/final.md | /university-admissions/ |
| university-admissions/oxbridge.md | /university-admissions/oxbridge/ |
| university-admissions/personal-statement.md | /university-admissions/personal-statement/ |
| university-admissions/masters.md | /university-admissions/masters/ |
| university-admissions/admissions-tests.md | /university-admissions/admissions-tests/ |
| services/europe.md | /university-admissions/europe/ |
| services/usa.md | /university-admissions/usa/ |
| services/phd.md | /university-admissions/phd/ |
| executive/final.md | /executive-education/ |
| executive/mba.md | /executive-education/mba/ |
| executive/oxford-said.md | /executive-education/mba/oxford-said/ |
| executive/oxford-emba.md | /executive-education/mba/oxford-executive-mba/ |
| executive/management-programmes.md | /executive-education/management-programmes/ |
| tutors/final.md | /tutors/ |
| tutors/gcse.md | /tutors/gcse/ |
| tutors/a-level.md | /tutors/a-level/ |
| tutors/ib.md | /tutors/ib/ |
| tutors/revision-courses.md | /tutors/revision-courses/ |
| tutors/easter.md | /tutors/revision-courses/easter/ |
| tutors/homeschooling.md | /tutors/homeschooling/ |
| summer/final.md | /summer-schools/ |
| summer/oxford.md | /summer-schools/oxford/ |
| services/assessment.md | /assessment/ |
| services/career-guidance.md | /career-guidance/ |
| services/language-preparation.md | /language-preparation/ |
| services/prices.md | /prices/ |
| trust/about.md | /about/ |
| trust/team.md | /team/ |
| trust/cases.md | /cases/ |
| trust/reviews.md | /reviews/ |
| trust/events.md | /events/ |
| trust/open-day.md | /events/open-day/ |
| trust/apply.md | /apply/ |
| trust/contact.md | /contact/ |
| trust/guides.md | /guides/ |
| trust/blog.md | /blog/ |
| trust/media.md | /media/ — на паузе, исключить из запуска |

Итого: 43 файла. Шаблоны `/schools/{name}/` и `/tutors/{name}/` — страницы-шаблоны, не заполнялись (нет данных школ/тьюторов).

## Бренд

- Тело текстов: **ALBION**
- «ALBION Oxford» — только мета/schema/GBP (проверено сканом: 0 вхождений в body)

## Отличия EN-ветки от RU

- Убраны российский контекст (FAQ «из России», цены в рублях), добавлены релевантные EN-интенты: catchment/grammar для day schools, IB vs A-Level, GMAT rounds, catchment logic
- Кейсы — те же, обезличенные; без workflow «согласия семей»
- Летние программы написаны по реальным файлам клиента (Dukes Cambridge 14–17, Dulwich 12–14, Earlscliffe 13–17, InvestIN 15–18, day camps 6–12 от £595/нед)

## Открытые ⏳-плейсхолдеры (данные от клиента)

1. Прайсы: опека, career guidance, Saïd MBA/EMBA/дипломы, летние residential
2. Даты: Easter, open day, летние потоки (verify per season)
3. Имена школ в кейсах/витрине — ждут разрешений
4. Google Business Profile: ссылка/доступ для отзывов
5. Команда: фото, био, титул Алтынай, спеллинг фамилии Уильяма
6. UCAS PS reform — verify current format
7. Управленческие программы — детали от клиента
8. Email на contact page — подтвердить
9. PDF-гиды — в производстве

## Мета

`meta.csv` — title/description для всех 42 страниц (колонки file, url, title, description). Бренд в мета: ALBION Oxford.
Правила сборки сайта: `wave1/HANDOFF.md`.

## Проверки (выполнено)

- 43 файла, все URL из таксономии покрыты (шаблоны — осознанно пропущены)
- ALBION Oxford в body: 0 · кириллица: 0 · битые внутренние ссылки: 0 (по таксономии)
- Не проверено: прогон внешним LLM-редактором (editor_pass.py настроен под RU-контекст — для EN нужен EN-промт, задача на следующий прогон)
