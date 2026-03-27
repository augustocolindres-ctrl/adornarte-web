create extension if not exists pgcrypto;

create table if not exists public.adornarte_products (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.adornarte_customers (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.adornarte_sales (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.adornarte_abonos (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.adornarte_activity (
  id uuid primary key default gen_random_uuid(),
  tipo text,
  descripcion text,
  datos jsonb not null default '{}'::jsonb,
  usuario text,
  fecha timestamptz not null default now()
);

create table if not exists public.adornarte_store (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.adornarte_backups (
  id uuid primary key default gen_random_uuid(),
  fecha timestamptz not null default now(),
  cajero text,
  version integer default 1,
  datos jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at_generic()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_adornarte_products_updated_at on public.adornarte_products;
create trigger trg_adornarte_products_updated_at
before update on public.adornarte_products
for each row execute function public.set_updated_at_generic();

drop trigger if exists trg_adornarte_customers_updated_at on public.adornarte_customers;
create trigger trg_adornarte_customers_updated_at
before update on public.adornarte_customers
for each row execute function public.set_updated_at_generic();

drop trigger if exists trg_adornarte_sales_updated_at on public.adornarte_sales;
create trigger trg_adornarte_sales_updated_at
before update on public.adornarte_sales
for each row execute function public.set_updated_at_generic();

drop trigger if exists trg_adornarte_abonos_updated_at on public.adornarte_abonos;
create trigger trg_adornarte_abonos_updated_at
before update on public.adornarte_abonos
for each row execute function public.set_updated_at_generic();

drop trigger if exists trg_adornarte_store_updated_at on public.adornarte_store;
create trigger trg_adornarte_store_updated_at
before update on public.adornarte_store
for each row execute function public.set_updated_at_generic();

alter table public.adornarte_products enable row level security;
alter table public.adornarte_customers enable row level security;
alter table public.adornarte_sales enable row level security;
alter table public.adornarte_abonos enable row level security;
alter table public.adornarte_activity enable row level security;
alter table public.adornarte_store enable row level security;
alter table public.adornarte_backups enable row level security;

do $$
begin
  -- products
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_products' and policyname='products_all') then
    create policy products_all on public.adornarte_products for all to anon, authenticated using (true) with check (true);
  end if;
  -- customers
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_customers' and policyname='customers_all') then
    create policy customers_all on public.adornarte_customers for all to anon, authenticated using (true) with check (true);
  end if;
  -- sales
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_sales' and policyname='sales_all') then
    create policy sales_all on public.adornarte_sales for all to anon, authenticated using (true) with check (true);
  end if;
  -- abonos
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_abonos' and policyname='abonos_all') then
    create policy abonos_all on public.adornarte_abonos for all to anon, authenticated using (true) with check (true);
  end if;
  -- activity
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_activity' and policyname='activity_all') then
    create policy activity_all on public.adornarte_activity for all to anon, authenticated using (true) with check (true);
  end if;
  -- store
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_store' and policyname='store_all') then
    create policy store_all on public.adornarte_store for all to anon, authenticated using (true) with check (true);
  end if;
  -- backups
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='adornarte_backups' and policyname='backups_all') then
    create policy backups_all on public.adornarte_backups for all to anon, authenticated using (true) with check (true);
  end if;
end $$;

create index if not exists idx_adornarte_products_updated_at on public.adornarte_products(updated_at desc);
create index if not exists idx_adornarte_sales_updated_at on public.adornarte_sales(updated_at desc);
create index if not exists idx_adornarte_customers_updated_at on public.adornarte_customers(updated_at desc);
create index if not exists idx_adornarte_abonos_updated_at on public.adornarte_abonos(updated_at desc);
create index if not exists idx_adornarte_activity_fecha on public.adornarte_activity(fecha desc);
create index if not exists idx_adornarte_backups_fecha on public.adornarte_backups(fecha desc);

-- Migración desde adornarte_store si ya tienes datos ahí.
insert into public.adornarte_customers (id, data)
select coalesce(elem->>'id', gen_random_uuid()::text), elem
from public.adornarte_store s,
     lateral jsonb_array_elements(
       case
         when jsonb_typeof(s.data)='object' and s.data ? 'value' then s.data->'value'
         else s.data
       end
     ) elem
where s.key='aa_clientes'
on conflict (id) do update set data=excluded.data, updated_at=now();

insert into public.adornarte_sales (id, data)
select coalesce(elem->>'id', gen_random_uuid()::text), elem
from public.adornarte_store s,
     lateral jsonb_array_elements(
       case
         when jsonb_typeof(s.data)='object' and s.data ? 'value' then s.data->'value'
         else s.data
       end
     ) elem
where s.key='aa_ventas'
on conflict (id) do update set data=excluded.data, updated_at=now();

insert into public.adornarte_abonos (id, data)
select coalesce(elem->>'id', gen_random_uuid()::text), elem
from public.adornarte_store s,
     lateral jsonb_array_elements(
       case
         when jsonb_typeof(s.data)='object' and s.data ? 'value' then s.data->'value'
         else s.data
       end
     ) elem
where s.key='aa_abonos'
on conflict (id) do update set data=excluded.data, updated_at=now();


insert into public.adornarte_products (id, data)
select coalesce(elem->>'id', gen_random_uuid()::text), elem
from public.adornarte_store s,
     lateral jsonb_array_elements(
       case
         when jsonb_typeof(s.data)='object' and s.data ? 'value' then s.data->'value'
         else s.data
       end
     ) elem
where s.key='aa_products'
on conflict (id) do update set data=excluded.data, updated_at=now();

do $$
begin
  begin
    alter publication supabase_realtime add table public.adornarte_products;
  exception when duplicate_object then null; end;
  begin
    alter publication supabase_realtime add table public.adornarte_customers;
  exception when duplicate_object then null; end;
  begin
    alter publication supabase_realtime add table public.adornarte_sales;
  exception when duplicate_object then null; end;
  begin
    alter publication supabase_realtime add table public.adornarte_abonos;
  exception when duplicate_object then null; end;
end $$;
