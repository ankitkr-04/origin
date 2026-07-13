-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION unmark_previous_current_resume()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_current = true THEN
        UPDATE resumes SET is_current = false WHERE id != NEW.id AND is_current = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_single_current_resume ON resumes;
CREATE TRIGGER ensure_single_current_resume
BEFORE INSERT OR UPDATE ON resumes
FOR EACH ROW
EXECUTE FUNCTION unmark_previous_current_resume();